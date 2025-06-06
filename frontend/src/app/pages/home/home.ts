import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Profile } from '../../auth/auth.model';
import { Alert } from '../../shared/alert/alert';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Card } from './card/card';
import { DatePipe } from '@angular/common';
import { TopScorers } from './top-scorers/top-scorers';
import { Ranking } from '../ranking/ranking';

@Component({
  selector: 'app-home',
  imports: [
    Alert,
    RouterLink,
    MatProgressSpinner,
    Card,
    DatePipe,
    TopScorers,
    Ranking,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  currentUser = signal<Profile | null>(null);
  stopBetTime = signal<Date | null>(new Date());
  #destroyRef = inject(DestroyRef);
  showAlert = computed(() => Boolean(this.currentUser()) && (
    this.currentUser()!.topScorer === null || this.currentUser()!.winner === null)
  )

  ngOnInit() {
    const userSub = this.#activatedRoute.data.subscribe(data => {
      if (data['currentUser']) {
        this.currentUser.set(data['currentUser']);
      } else {
        this.currentUser.set(null);
      }
    })

    this.#destroyRef.onDestroy(() => {
      userSub.unsubscribe();
    })
  }
}
