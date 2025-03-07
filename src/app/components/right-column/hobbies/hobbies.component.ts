import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent {
  @Input() hobbies!: { icon: string }[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
