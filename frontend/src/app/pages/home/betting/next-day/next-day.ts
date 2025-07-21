import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BettingService } from '../betting.service';
import { Bet, BettingMatchDay } from '../betting.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { NoMatchDay } from '../no-match-day/no-match-day';
import { finalize } from 'rxjs';
import { TeamLabel } from '../../../../shared/teams/team-label/team-label';

@Component({
  selector: 'app-next-day',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    FormsModule,
    MatInput,
    MatFormField,
    MatButton,
    NoMatchDay,
    TeamLabel
  ],
  templateUrl: './next-day.html',
  styleUrl: './next-day.scss'
})
export class NextDay implements OnInit {
  #destroyRef = inject(DestroyRef);
  #bettingService = inject(BettingService);

  matchDay = signal<BettingMatchDay | null>(null);
  bets = signal<Bet[]>([]);
  isFetching = signal(false);
  isDirty = signal(false);
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  displayedColumns = ['match', 'firstTeamResult', 'secondTeamResult'];

  ngOnInit() {
    this.isFetching.set(true);
    const betsSub = this.#bettingService.getNextMatchDay().subscribe({
      next: (data) => {
        this.matchDay.set(data.matchDay);
        this.bets.set(data.bets);
      },
      error: (err: Error) => {
        console.error('Error fetching next match day:', err);
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

  onSubmit() {
    this.isSubmitting.set(true);
    const sub = this.#bettingService.updateBets(
      this.matchDay()!.id,
      this.bets().map(bet => ({
        id: bet.id,
        firstTeamResult: bet.firstTeamResult,
        secondTeamResult: bet.secondTeamResult,
        hasBonus: bet.hasBonus
      }))
    ).pipe(
      finalize(() => {
        this.isSubmitting.set(false);
        this.isDirty.set(false);
      })
    ).subscribe();

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onInputChange() {
    this.isDirty.set(true);
  }
}
