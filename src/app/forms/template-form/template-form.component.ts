import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Для шаблонних форм
import { Router } from '@angular/router'; // Для навігації

// Сервіси та моделі
import { UserData } from '../../services/resume.service'; // Використовуємо інтерфейс
import { AuthService } from '../../services/auth.service'; // Наш новий сервіс

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {
  // Інжектуємо сервіси
  private authService = inject(AuthService);
  private router = inject(Router);

  // Стан компонента
  isLoading = false;
  submissionStatus: { success: boolean; message: string } | null = null;

  // Властивості для двостороннього зв'язування з [(ngModel)]
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit(registrationForm: NgForm): void {
    this.submissionStatus = null; // Скидаємо статус перед новою спробою

    // Перевірка валідності форми (вбудовані валідатори Angular)
    if (registrationForm.invalid) {
      console.warn('Template Form is invalid');
      // Позначимо всі поля як 'touched', щоб показати помилки одразу
      Object.values(registrationForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return; // Не відправляємо невалідну форму
    }

    console.log('Template Form Submitted!', registrationForm.value);
    this.isLoading = true; // Показуємо індикатор завантаження

    // Готуємо дані для відправки
    const userData: UserData = {
      username: registrationForm.value.username,
      email: registrationForm.value.email,
      password: registrationForm.value.password
    };

    // Викликаємо метод реєстрації з AuthService
    this.authService.register(userData).subscribe({
      // Обробка успішної відповіді
      next: (response) => {
        console.log('User registered successfully (Template):', response);
        this.submissionStatus = { success: true, message: `User ${response.username || response.email} registered successfully. Redirecting...` };
        this.isLoading = false; // Ховаємо індикатор завантаження
        registrationForm.reset(); // Очищаємо форму (значення та статус)

        // Очищаємо властивості компонента, зв'язані з ngModel
        this.username = '';
        this.email = '';
        this.password = '';

        // Перенаправляємо користувача після невеликої затримки
        setTimeout(() => {
          this.router.navigate(['/']); // Перехід на головну сторінку
        }, 1500); // Затримка 1.5 секунди
      },
      // Обробка помилки (включаючи помилку "Email already exists")
      error: (error) => {
        console.error('Error registering user (Template):', error);
        this.submissionStatus = { success: false, message: `Registration failed: ${error?.message || 'Unknown error'}` };
        this.isLoading = false; // Ховаємо індикатор завантаження
      }
    });
  }
}
