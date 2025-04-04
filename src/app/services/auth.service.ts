import { Injectable, inject } from '@angular/core'; // Додаємо inject
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Імпортуємо HttpClient
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'; // Імпортуємо оператори


export interface UserData { id?: number | string; username: string; email: string; password?: string; }


// Тип для даних користувача, які повертає бекенд
type BackendUser = Omit<UserData, 'password'>;

// Тип для відповіді сервера при логіні
interface LoginResponse {
  message: string;
  user: BackendUser;
  token: string;
}

const AUTH_TOKEN_KEY = 'demo_auth_token'; // Ключ для зберігання токена в localStorage
const API_URL = 'http://localhost:3000/api'; // Базовий URL нашого локального бекенду

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient); // Інжектуємо HttpClient
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() { }

  // --- Реєстрація ---
  register(userData: UserData): Observable<BackendUser> {
    console.log('[AuthService] Attempting to register via API:', userData.email);
    // Відправляємо POST-запит на бекенд
    return this.http.post<BackendUser>(`${API_URL}/register`, userData).pipe(
      tap(user => console.log('[AuthService] API registration successful:', user)), // Логуємо успіх
      catchError(this.handleError) // Обробляємо помилки HTTP
    );
  }

  // --- Логін ---
  login(credentials: { email: string; password?: string }): Observable<BackendUser> {
    console.log('[AuthService] Attempting to login via API:', credentials.email);
    return this.http.post<LoginResponse>(`${API_URL}/login`, credentials).pipe(
      tap(response => {
        // Зберігаємо отриманий токен
        this.saveToken(response.token);
        this.loggedIn.next(true); // Оновлюємо стан
        console.log('[AuthService] API login successful:', response.user);
      }),
      // Витягуємо дані користувача з відповіді для повернення з Observable
      map(response => response.user),
      catchError(this.handleError) // Обробляємо помилки HTTP (включаючи 401)
    );
  }

  // --- Вихід ---
  logout(): void {
    this.clearToken(); // Видаляємо токен з localStorage
    this.loggedIn.next(false); // Оновлюємо стан
    console.log('[AuthService] User logged out');
  }

  // --- Робота з токеном в localStorage  ---
  private saveToken(token: string): void {
    try { localStorage.setItem(AUTH_TOKEN_KEY, token); }
    catch (e) { console.error('Error saving token', e); }
  }

  getToken(): string | null {
    try { return localStorage.getItem(AUTH_TOKEN_KEY); }
    catch (e) { console.error('Error reading token', e); return null; }
  }

  private clearToken(): void {
    try { localStorage.removeItem(AUTH_TOKEN_KEY); }
    catch (e) { console.error('Error removing token', e); }
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  // --- Перевірка стану автентифікації  ---
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // --- Обробка помилок HTTP ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Помилка на стороні клієнта або мережі
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Бекенд повернув неуспішний код відповіді.
      // Тіло відповіді може містити підказку про причину.
      if (error.status === 409) { // Conflict (Email exists)
        errorMessage = error.error?.message || 'Email already exists.';
      } else if (error.status === 401) { // Unauthorized (Invalid credentials)
        errorMessage = error.error?.message || 'Invalid credentials.';
      } else if (error.status === 400) { // Bad Request (Missing fields)
        errorMessage = error.error?.message || 'Invalid data provided.';
      } else {
        errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
      }
    }
    console.error('[AuthService] HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage)); // Повертаємо Observable з помилкою
  }
}
