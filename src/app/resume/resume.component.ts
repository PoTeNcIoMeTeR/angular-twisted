import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftColumnComponent } from '../components/left-column/left-column.component';
import { RightColumnComponent } from '../components/right-column/right-column.component';

@Component({
  selector: 'app-resume',
  standalone: true,

  imports: [
    CommonModule,
    LeftColumnComponent,
    RightColumnComponent
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

}
