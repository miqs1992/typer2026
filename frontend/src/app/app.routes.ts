import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Rounds } from './pages/rounds/rounds';
import { Login } from './pages/auth/login/login';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Home },
      { path: 'rounds', component: Rounds },
    ]
  },
  { path: 'login', component: Login },
];

