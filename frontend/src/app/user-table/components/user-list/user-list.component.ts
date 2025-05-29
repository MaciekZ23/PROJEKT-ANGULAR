import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRowComponent } from '../user-row/user-row.component';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserRowComponent, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true
})

export class UserListComponent {
  @Input() users: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onEdit(user: any) {
    this.edit.emit(user);
  }

  onDelete(userId: number) {
    this.delete.emit(userId);
  }
}
