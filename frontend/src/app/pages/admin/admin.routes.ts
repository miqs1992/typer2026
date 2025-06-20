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
import { Rounds } from './rounds/rounds';
import { NewRound } from './rounds/new-round/new-round';
import { EditRound } from './rounds/edit-round/edit-round';
import { MatchDays } from './rounds/match-days/match-days';
import { NewMatchDay } from './rounds/match-days/new-match-day/new-match-day';
import { EditMatchDay } from './rounds/match-days/edit-match-day/edit-match-day';
import { Matches } from './rounds/match-days/matches/matches';
import { NewMatch } from './rounds/match-days/matches/new-match/new-match';

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
  },
  {
    path: 'rounds',
    children: [
      { path: '', component: Rounds },
      { path: 'new', component: NewRound },
      { path: ':roundId/edit', component: EditRound },
      { path: ':roundId/match-days', children: [
        { path: '', component: MatchDays },
        { path: 'new', component: NewMatchDay },
        { path: ':matchDayId', children: [
          { path: 'edit', component: EditMatchDay },
          { path: 'matches', component: Matches },
          { path: 'matches/new', component: NewMatch },
        ]}
      ]},
    ]
  }
];
