import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BettingService } from '../betting.service';
import { Bet, BettingMatchDay } from '../betting.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { NoMatchDay } from '../no-match-day/no-match-day';
import { TeamLabel } from '../../../../shared/teams/team-label/team-label';

@Component({
  selector: 'app-previous-day',
  imports: [
    MatProgressSpinner,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    MatHeaderCellDef,
    NoMatchDay,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    TeamLabel
  ],
  templateUrl: './previous-day.html',
  styleUrl: './previous-day.scss'
})
export class PreviousDay implements OnInit {
  #destroyRef = inject(DestroyRef);
  #bettingService = inject(BettingService);

  matchDay = signal<BettingMatchDay | null>(null);
  bets = signal<Bet[]>([]);
  isFetching = signal(false)
  error = signal<string | null>(null);

  displayedColumns = ['match', 'score', 'bet', 'points'];

  ngOnInit() {
    this.isFetching.set(true);
    const betsSub = this.#bettingService.getPreviousMatchDay().subscribe({
      next: (data) => {
        this.matchDay.set(data.matchDay);
        this.bets.set(data.bets);
      },
      error: (err: Error) => {
        console.error('Error fetching previous match day:', err);
        this.matchDay.set(null);
        this.bets.set([]);
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.#destroyRef.onDestroy(() => {
      betsSub.unsubscribe();
    })
  }
}
