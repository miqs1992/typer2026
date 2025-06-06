import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RankingService } from './ranking.service';
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
import { FlagIcon } from '../../shared/flag-icon/flag-icon';

@Component({
  selector: 'app-ranking',
  imports: [
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    FlagIcon,
  ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking implements OnInit {
  #rankingService = inject(RankingService);
  ranking = this.#rankingService.loadedRanking;
  isFetching = signal(false)
  error = signal<string | null>(null);
  #destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['rank', 'name', 'points', 'exact', 'topScorer', 'winner'];

  ngOnInit() {
    this.isFetching.set(true);
    this.error.set('');
    const sub = this.#rankingService.loadFullRanking()
      .subscribe({
        complete: () => {
          this.isFetching.set(false);
        },
        error: (err: Error) => {
          this.isFetching.set(false);
          this.error.set(err.message);
        }
      });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
}
