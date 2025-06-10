import { Routes } from '@angular/router';
import { Users } from './users/users';
import { NewUser } from './users/new-user/new-user';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: Users },
      { path: 'new', component: NewUser },
    ]
  }
];
