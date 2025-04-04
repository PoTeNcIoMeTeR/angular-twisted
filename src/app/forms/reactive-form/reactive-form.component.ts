import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  ReactiveFormsModule, // Необхідно для реактивних форм
  FormBuilder,         // Сервіс для створення форм
  FormGroup,           // Клас для групи контролів
  Validators,          // Набір стандартних валідаторів
  AbstractControl      // Базовий клас для контролів/груп
} from '@angular/forms';

import { AuthService } from '../../services/auth.service'; // Наш сервіс автентифікації

@Component({
  selector: 'app-login-form',

  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Імпорт модуля реактивних форм
    RouterLink
  ],
  templateUrl: './reactive-form.component.html', // Використовуємо той самий шаблон, але оновлений
  styleUrls: ['./reactive-form.component.scss']
})

export class ReactiveFormComponent implements OnInit {
  // Інжектуємо залежності
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Властивість для зберігання FormGroup
  loginForm!: FormGroup;

  // Стан компонента
  isLoading = false;
  submissionStatus: { success: boolean; message: string } | null = null;

  // Ініціалізація форми при старті компонента
  ngOnInit(): void {
    this.initializeForm();
  }

  // Метод для створення та налаштування FormGroup
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      // Контрол для email: обов'язковий, має бути валідним email
      email: ['', [Validators.required, Validators.email]],
      // Контрол для пароля: обов'язковий
      password: ['', [Validators.required]]
    });
  }

  // Гетери для зручного доступу до контролів у шаблоні
  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }


  // Обробка відправки форми логіну
  onSubmit(): void {
    this.submissionStatus = null; // Скидаємо попередні повідомлення

    // Перевіряємо валідність форми
    if (this.loginForm.invalid) {
      console.warn('Login Form is invalid');
      // Позначаємо всі поля як "торкнуті", щоб показати помилки
      this.loginForm.markAllAsTouched();
      return; // Не відправляємо невалідну форму
    }

    console.log('Login Form Submitted!', this.loginForm.value);
    this.isLoading = true; // Показуємо індикатор завантаження

    // Готуємо дані для логіну
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Викликаємо метод login сервісу AuthService
    this.authService.login(credentials).subscribe({
      // Обробка успішного логіну
      next: (user) => {
        console.log('Login successful for user:', user);
        this.submissionStatus = { success: true, message: `Welcome back, ${user.username || user.email}! Redirecting...` };
        this.isLoading = false;

        // Перенаправляємо на головну сторінку після невеликої затримки
        setTimeout(() => {
          this.router.navigate(['/']); // Перехід на сторінку резюме
        }, 1000); // Затримка 1 секунда
      },
      // Обробка помилки логіну (наприклад, "Invalid credentials")
      error: (error) => {
        console.error('Error logging in:', error);
        this.submissionStatus = { success: false, message: `${error?.message || 'Login failed. Please try again.'}` };
        this.isLoading = false; // Ховаємо індикатор завантаження
      }
    });
  }
}
