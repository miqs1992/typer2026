import { Routes } from '@angular/router';
import { Users } from './users/users';
import { NewUser } from './users/new-user/new-user';
import { EditUser } from './users/edit-user/edit-user';
import { Teams } from './teams/teams';
import { NewTeam } from './teams/new-team/new-team';
import { EditTeam } from './teams/edit-team/edit-team';
import { Players } from './teams/players/players';
import { NewPlayer } from './teams/players/new-player/new-player';
import { EditPlayer } from './teams/players/edit-player/edit-player';

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
      { path: ':teamId/players', component: Players },
      { path: ':teamId/players/new', component: NewPlayer },
      { path: ':teamId/players/:playerId/edit', component: EditPlayer },
      { path: ':teamId/edit', component: EditTeam },
    ]
  }
];
