import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  submit() {
    this.save.emit(this.user);
  }
}
