import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Імпортуємо директиви роутера для використання в шаблоні
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // Тепер імпортуємо CommonModule та директиви роутера
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
    // LeftColumnComponent, RightColumnComponent, TemplateFormComponent більше НЕ потрібні тут!
  ],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Resume';
}
