import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Rounds } from './pages/rounds/rounds';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'rounds', component: Rounds }
];
