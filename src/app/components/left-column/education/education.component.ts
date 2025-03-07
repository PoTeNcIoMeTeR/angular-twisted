import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  @Input() education!: { year: string, degree: string, university: string }[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
