import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contacts!: Contact[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
  @Output() addContact = new EventEmitter<Contact>();

  newContact: Contact = { title: '', completed: false };

  onSubmit(): void {
    if (this.newContact.title) { // Check for title
      this.addContact.emit(this.newContact);
      this.newContact = { title: '', completed: false }; // Reset
    }
  }
}
