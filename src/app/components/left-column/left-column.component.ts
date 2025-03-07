import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [CommonModule, ContactComponent, EducationComponent, ProfilePictureComponent, SkillsComponent],
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.scss']
})
export class LeftColumnComponent {
  // Data for child components:
  photoUrl = 'assets/photo.jpg'; // Correct path
  contacts = [
    { type: 'Phone', value: '+000 123 456 789' },
    { type: 'Email', value: 'yourname@gmail.com' },
    { type: 'Address', value: 'Your Street Address', subValue: 'Town/City, zip code' }
  ];

  education = [
    { year: '2014 - 2016', degree: 'Degree / Major Name', university: 'University name here' },
    { year: '2010 - 2014', degree: 'Degree / Major Name', university: 'University name here' }
  ];

  skills = ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'];

  // Track which sections are collapsed:
  isContactCollapsed = false;
  isEducationCollapsed = false;
  isSkillsCollapsed = false;

  // Toggle methods (now just setting the boolean):
  toggleSection(section: 'contact' | 'education' | 'skills') {
    if (section === 'contact') {
      this.isContactCollapsed = !this.isContactCollapsed;
    } else if (section === 'education') {
      this.isEducationCollapsed = !this.isEducationCollapsed;
    } else if (section === 'skills') {
      this.isSkillsCollapsed = !this.isSkillsCollapsed;
    }
  }
}
