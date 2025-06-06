import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Rounds } from './pages/rounds/rounds';
import { Login } from './pages/auth/login/login';
import { AuthGuard } from './auth/auth.guard';
import { Ranking } from './pages/ranking/ranking';
import { CurrentUserResolver } from './auth/auth.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Home },
      { path: 'rounds', component: Rounds },
      { path: 'ranking', component: Ranking },
    ], resolve: {
      currentUser: CurrentUserResolver
    },
    title: 'Euro Typer 2026',
  },
  { path: 'login', component: Login },
];

