import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Profile } from '../../auth/auth.model';
import { Alert } from '../../shared/alert/alert';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Card } from './card/card';
import { DatePipe } from '@angular/common';
import { TopScorers } from './top-scorers/top-scorers';
import { Ranking } from '../ranking/ranking';
import { StopBetTimeService } from '../../shared/stop-bet-time/stop-bet-time.service';

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
  #destroyRef = inject(DestroyRef);
  #stopBetTimeService = inject(StopBetTimeService);

  stopBetTime = signal<Date | null>(null);
  currentUser = signal<Profile | null>(null);

  showSelectionAlert = computed(() => Boolean(this.currentUser()) && (
    this.currentUser()!.topScorer === null || this.currentUser()!.winner === null)
  )

  showPaymentAlert = computed(() => Boolean(this.currentUser()) && !this.currentUser()!.hasPaid);

  ngOnInit() {
    const userSub = this.#activatedRoute.data.subscribe(data => {
      if (data['currentUser']) {
        this.currentUser.set(data['currentUser']);
      } else {
        this.currentUser.set(null);
      }
    })

    const stopBetTimeSub = this.#stopBetTimeService.getNextStopBetTime().subscribe(time => {
      if (time) {
        this.stopBetTime.set(time);
      } else {
        this.stopBetTime.set(null);
      }
    })

    this.#destroyRef.onDestroy(() => {
      userSub.unsubscribe();
      stopBetTimeSub.unsubscribe();
    })
  }
}
