// Routing aplikacji - przypisanie komponentow do sciezek URL

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-table/user-table.module').then((m) => m.UserTableModule)
  }
];



