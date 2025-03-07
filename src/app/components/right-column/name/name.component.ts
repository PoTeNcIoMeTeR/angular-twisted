import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent {
  @Input() name!: string;
  @Input() surname!: string;
  @Input() profession!: string;
}
