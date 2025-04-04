import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
// Додаємо withDebugTracing
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    // Додаємо withDebugTracing() як другий аргумент
    provideRouter(routes, withDebugTracing())
  ]
};
