import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Skill } from '../../../models/skill.model';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() skills!: Skill[];
  @Input() isCollapsed!: boolean;
  @Output() toggle = new EventEmitter<void>();
  @Output() addSkill = new EventEmitter<Skill>();

  newSkill: Skill = { name: ''};

  onSubmit(): void {
    if(this.newSkill.name){
      this.addSkill.emit(this.newSkill);
      this.newSkill = { name: ''};
    }
  }
}
