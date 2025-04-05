import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user: any = null; // jeśli istnieje, to edycja
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  firstName = '';
  lastName = '';
  email = '';

  ngOnInit() 
  {
    if (this.user) 
      {
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.email = this.user.email;
    }
  }

  onClose() 
  {
    this.close.emit();
  }

  onSave() 
  {
    if (!this.firstName || !this.lastName || !this.email) return;
    const user = {
      ...this.user,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      avatar: this.user?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    };
    this.save.emit(user);
  }
}
