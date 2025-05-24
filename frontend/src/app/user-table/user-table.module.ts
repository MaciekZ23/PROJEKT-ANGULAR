import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './user-table.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRowComponent } from './components/user-row/user-row.component';

const routes: Routes = [
  {
    path: '',
    component: UserTableComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserTableComponent,
    UserListComponent,
    UserRowComponent
  ]
})
export class UserTableModule {}
