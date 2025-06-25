import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Rounds } from './pages/rounds/rounds';
import { AuthGuard } from './auth/auth.guard';
import { Ranking } from './pages/ranking/ranking';
import { CurrentUserResolver } from './auth/auth.resolver';
import { EditUser } from './pages/users/edit-user/edit-user';
import { IsBeforeFirstGameResolver } from './shared/stop-bet-time/is-before-first-game-resolver.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Home },
      { path: 'rounds', component: Rounds },
      { path: 'ranking', component: Ranking },
      { path: 'profile', component: EditUser, title: 'Profile' },
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.routes) },
    ], resolve: {
      currentUser: CurrentUserResolver,
      isBeforeFirstGame: IsBeforeFirstGameResolver,
    },
    title: 'Euro Typer 2026',
  },
];

