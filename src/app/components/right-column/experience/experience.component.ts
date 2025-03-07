import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() experiences!: { role: string, year: string, company: string, description: string }[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
