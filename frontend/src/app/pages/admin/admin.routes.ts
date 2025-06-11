import { Routes } from '@angular/router';
import { Users } from './users/users';
import { NewUser } from './users/new-user/new-user';
import { EditUser } from './users/edit-user/edit-user';
import { Teams } from './teams/teams';
import { NewTeam } from './teams/new-team/new-team';
import { EditTeam } from './teams/edit-team/edit-team';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: Users },
      { path: 'new', component: NewUser },
      { path: ':userId/edit', component: EditUser },
    ]
  },
  {
    path: 'teams',
    children: [
      { path: '', component: Teams },
      { path: 'new', component: NewTeam },
      { path: ':teamId/edit', component: EditTeam },
    ]
  }
];
