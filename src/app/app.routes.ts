import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard'; // Перевірте шлях
import { TemplateFormComponent } from './forms/template-form/template-form.component';
import { ResumeComponent } from './resume/resume.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component'; // Тепер це Login

export const routes: Routes = [
  // Маршрут для головної сторінки (резюме)
  {
    path: '',
    component: ResumeComponent,
    title: 'My Resume'
  },
  {
    path: 'resume', // Аліас
    component: ResumeComponent,
    title: 'My Resume'
  },

  // Маршрут для шаблонної форми РЕЄСТРАЦІЇ
  {
    path: 'register-template',
    component: TemplateFormComponent,
    title: 'Register'
  },

  // Маршрут для сторінки ЛОГІНУ (використовує ReactiveFormComponent)
  // {
  //   path: 'login', // Шлях для логіну
  //   component: ReactiveFormComponent, // Компонент, що містить форму логіну
  //   title: 'Login'
  // },
  {
    path: 'login',
    component: ReactiveFormComponent, // Компонент з формою логіну
    canActivate: [loginGuard],      // Застосовуємо Guard тут
    title: 'Login'
  },

  // Маршрут Wildcard (опціонально, для сторінки "Не знайдено")
  // { path: '**', component: PageNotFoundComponent }
];
