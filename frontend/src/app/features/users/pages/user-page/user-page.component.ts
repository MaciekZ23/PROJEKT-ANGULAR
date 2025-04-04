import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user.service';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    UserListComponent,
    UserFormComponent,
    FormsModule
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  users: any[] = [];
  showForm = false;
  currentUser: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openForm(user?: any) {
    this.currentUser = user ? { ...user } : {};
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  onSave(user: any) {
    if (user.id) {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
    } else {
      user.id = Math.random(); // tymczasowy fake ID
      this.users.push(user);
    }
    this.closeForm();
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
  }
}
