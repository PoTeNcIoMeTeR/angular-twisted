import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profileText1!: string;
  @Input() profileText2!: string;
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
