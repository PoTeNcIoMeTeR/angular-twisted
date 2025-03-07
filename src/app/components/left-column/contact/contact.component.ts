import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contacts!: { type: string, value?: string, subValue?: string }[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
}
