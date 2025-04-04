import { Routes } from '@angular/router';
import { UserPageComponent } from './features/users/pages/user-page/user-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserPageComponent }
];
