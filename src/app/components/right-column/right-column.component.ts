import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameComponent } from './name/name.component';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { ReferenceComponent } from './reference/reference.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [CommonModule, NameComponent, ProfileComponent, ExperienceComponent, ReferenceComponent, HobbiesComponent],
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.scss']
})
export class RightColumnComponent {
  name = 'David';
  surname = 'Anderson';
  profession = 'UX DESIGNER';
  profileText1 = 'Lorem ipsum dolor sit amet, eloquentiam appellantur ea usu, quaeque perfecto dignissim sed ei. Vel no percipit adipisci. Quo id recteque convenire efficiantur. Altera omnium salutatus eu qui, ut idque fabulas reformidans sit. Quaestio adipiscing ei sed, ad porro luptatum cum.';
  profileText2 = 'Lorem ipsum dolor sit amet, eloquentiam appellantur ea usu, quaeque perfecto dignissim sed ei. Vel no percipit adipisci. Quo id recteque convenire efficiantur. Altera omnium salutatus eu qui, ut idque fabulas reformidans sit. Quaestio adipiscing ei sed, ad porro luptatum cum.tiam faucibus fermentum molestie. Morbi vel velit pulvinar, hendrerit mi vel, viverra magna. Morbi erat lectus, vestibulum eget interdum in, fermentum et sapien.Nunc at diam a arcu iaculis aliquet vel consectetur lorem. Aenean non leo nec tortor tempor sodales. Sed at magna nulla. Pellentesque at ante a nunc sollicitudin vestibulum eget in purus.';

  experiences = [
    { role: 'Senior UX Designer', year: '2020', company: 'Company Name / Location', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { role: 'User Interface Designer', year: '2016', company: 'Company Name / Location', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
  ];

  references = [
    { role: 'Senior Designer', name: 'Jhon Ander Smith', company: 'Company name here' },
    { role: 'Senior Designer', name: 'Jhon Ander Smith', company: 'Company name here' }
  ];
  hobbies = [
    { icon: 'bi-camera' },
    { icon: 'bi-music-note' },
    { icon: 'bi-pencil' },
    { icon: 'bi-palette' }
  ];

  isProfileCollapsed = false;
  isExperienceCollapsed = false;
  isReferenceCollapsed = false;
  isHobbiesCollapsed = false;
  toggleSection(section: 'profile' | 'experience' | 'reference' | 'hobbies') {
    if (section === 'profile') {
      this.isProfileCollapsed = !this.isProfileCollapsed;
    } else if (section === 'experience') {
      this.isExperienceCollapsed = !this.isExperienceCollapsed;
    } else if (section === 'reference') {
      this.isReferenceCollapsed = !this.isReferenceCollapsed;
    } else if (section === 'hobbies') {
      this.isHobbiesCollapsed = !this.isHobbiesCollapsed;
    }
  }
}
