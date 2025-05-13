import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    HttpClientModule,
    UserFormComponent,
    ConfirmModalComponent
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  private userIdToDelete: number | null = null;

  constructor(private userService: UserService) { }

  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: () => alert('Blad podczas pobierania uzytkownikow')
    });
  }

  onAdd() {
    this.selectedUser = null;
    this.userFormComponent.open();
  }

  onEdit(user: any) {
    this.selectedUser = { ...user };
    this.userFormComponent.open();
  }

  onDelete(userId: number) {
    this.userIdToDelete = userId;
    this.confirmModal.open();
  }

  confirmDelete() {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.userIdToDelete);
          this.userIdToDelete = null;
        },
        error: () => {
          alert('Nie udalo sie usunac uzytkownika');
          this.userIdToDelete = null;
        }
      });
    }
  }

  onCancelDelete() {
    this.userIdToDelete = null;
  }

  onCloseModal() { }

  onSaveUser(user: any) {
    if (user.id) {
      this.userService.updateUser(user).subscribe({
        next: () => {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index > -1) {
            this.users[index] = user;
          }
        },
        error: () => alert('Blad podczas aktualizacji uzytkownika')
      });
    }
    else {
      this.userService.addUser(user).subscribe({
        next: (newUser) => this.users.push(newUser),
        error: () => alert('Blad podczas dodawania uzytkownika')
      });
    }
  }
}
