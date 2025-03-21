import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { SkillsComponent } from './skills/skills.component';
import { ResumeService } from '../../services/resume.service';
import { Contact } from '../../models/contact.model';
import { Education } from '../../models/education.model';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactComponent, EducationComponent, ProfilePictureComponent, SkillsComponent],
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.scss']
})
export class LeftColumnComponent implements OnInit {
  private resumeService = inject(ResumeService);

  photoUrl = 'assets/photo.jpg';
  contacts: Contact[] = [];
  education: Education[] = [];
  skills: Skill[] = [];
  errorMessage: string = '';

  isContactCollapsed = false;
  isEducationCollapsed = false;
  isSkillsCollapsed = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.resumeService.getContacts(false).subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        console.log('Contacts received (incomplete):', this.contacts);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
    this.resumeService.getEducation().subscribe({
      next: (education) => {
        this.education = education;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });

    this.resumeService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  handleAddContact(newContact: Contact): void {
    this.resumeService.addContact(newContact).subscribe({
      next: (createdContact) => {
        this.contacts.push(createdContact);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  handleAddEducation(newEducation: Education): void {
    this.resumeService.addEducation(newEducation).subscribe({
      next: (createdEducation) => {
        this.education.push(createdEducation);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  handleAddSkill(newSkill: Skill): void {
    this.resumeService.addSkill(newSkill).subscribe({
      next: (createdSkill) => {
        this.skills.push(createdSkill);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

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
