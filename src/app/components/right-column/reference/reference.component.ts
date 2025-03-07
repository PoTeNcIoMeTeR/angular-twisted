import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent {
  @Input() references!: { role: string, name: string, company: string }[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
