import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Перевіряємо, чи користувач автентифікований
  if (authService.isAuthenticated()) {

    console.log('[LoginGuard] User is already logged in. Redirecting to /');
    // Створюємо UrlTree для перенаправлення
    return router.createUrlTree(['/']);
  } else {
    // Якщо не залогінений - дозволяємо перейти на сторінку логіну
    console.log('[LoginGuard] User is not logged in. Allowing access to /login');
    return true;
  }
};
