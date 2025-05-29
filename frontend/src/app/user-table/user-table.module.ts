import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './user-table.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRowComponent } from './components/user-row/user-row.component';

console.log('UserTableModule has been lazy-loaded');

const routes: Routes = [
  { path: '', component: UserTableComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserTableComponent
  ]
})
export class UserTableModule { }
