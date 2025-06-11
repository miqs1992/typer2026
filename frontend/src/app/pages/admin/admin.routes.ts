import { Routes } from '@angular/router';
import { Users } from './users/users';
import { NewUser } from './users/new-user/new-user';
import { EditUser } from './users/edit-user/edit-user';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: Users },
      { path: 'new', component: NewUser },
      { path: ':userId/edit', component: EditUser },
    ]
  }
];
