import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, UserListComponent, HttpClientModule, UserFormComponent],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
  users: any[] = [];
  showModal = false;
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void 
  {
    this.loadUsers();
  }

  // Zaladowanie uzytkownikow z API
  loadUsers()
  {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Otworz modal do dodania
  onAdd() {
    this.selectedUser = null;
    this.showModal = true;
  }
  // Otworz modal do edycji
  onEdit(user: any)
  {
    this.selectedUser = { ...user };
    this.showModal = true;
  }

  // Usun uzytkownika po kliknieciu ikony kosza
  onDelete(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== userId);
    });
  }
  
  onCloseModal() 
  {
    this.showModal = false;
  }

  // Zapisz dane z formularza
  onSaveUser(user: any) 
  {
    if (user.id) 
      {
      // edycja
      this.userService.updateUser(user).subscribe(() => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index > -1) this.users[index] = user;
        this.showModal = false;
      });
    } 
    else 
    {
      // dodanie
      this.userService.addUser(user).subscribe((newUser) => {
        this.users.push(newUser);
        this.showModal = false;
      });
    }
  }
}