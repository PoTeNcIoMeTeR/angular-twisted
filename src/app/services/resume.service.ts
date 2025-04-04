// src/app/services/resume.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Education } from '../models/education.model';
import { Skill } from '../models/skill.model';

// Додамо простий інтерфейс для даних користувача (опціонально, можна використовувати any)
export interface UserData {
  username: string;
  email: string;
  password?: string; // Пароль зазвичай не повертається API, тому опціональний
  id?: number; // JSONPlaceholder може повернути id
}


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private http = inject(HttpClient);

  private contactsUrl = 'https://jsonplaceholder.typicode.com/users/1/todos';
  private educationUrl = 'https://jsonplaceholder.typicode.com/users/1/albums';
  private skillsUrl = 'https://jsonplaceholder.typicode.com/users/1/posts';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users'; // <-- Додаємо URL для користувачів

  //  Методи для Contacts
  getContacts(completed?: boolean): Observable<Contact[]> {
    let url = this.contactsUrl;

    if (completed !== undefined) {
      url += `?completed=${completed}`;
    }

    return this.http.get<Contact[]>(url)
      .pipe(catchError(this.handleError));
  }
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact)
      .pipe(catchError(this.handleError));
  }

  // Методи для Education
  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.educationUrl)
      .pipe(catchError(this.handleError));
  }

  addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.educationUrl, education)
      .pipe(catchError(this.handleError));
  }

  //Методи для Skills
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsUrl)
      .pipe(catchError(this.handleError));
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillsUrl, skill)
      .pipe(catchError(this.handleError));
  }

  // *** НОВИЙ МЕТОД для реєстрації користувача ***
  registerUser(userData: UserData): Observable<UserData> {
    // Ми відправляємо дані на загальний ендпоінт /users
    // JSONPlaceholder поверне надіслані дані з присвоєним id
    return this.http.post<UserData>(this.usersUrl, userData)
      .pipe(catchError(this.handleError));
  }


  // Обробка помилок
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Повертаємо Observable, що завершується помилкою для подальшої обробки компонентом
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
