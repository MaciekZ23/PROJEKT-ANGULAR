import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserTableComponent } from './user-table/user-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UserTableComponent}
];