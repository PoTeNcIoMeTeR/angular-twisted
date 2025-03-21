import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  @Input() education!: Education[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
  @Output() addEducation = new EventEmitter<Education>();

  newEducation: Education = { year: '', degree: '', university: '' };

  onSubmit(): void {
    if (this.newEducation.year && this.newEducation.degree && this.newEducation.university) {
      this.addEducation.emit(this.newEducation);
      this.newEducation = { year: '', degree: '', university: '' };
    }
  }
}
