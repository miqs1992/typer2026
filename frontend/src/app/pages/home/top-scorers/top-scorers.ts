import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TopScorersService } from './top-scorers.service';
import { FlagIcon } from '../../../shared/flag-icon/flag-icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TopScorer } from './top-scorers.model';

@Component({
  selector: 'app-top-scorers',
  imports: [
    FlagIcon,
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
    MatHeaderCellDef
  ],
  templateUrl: './top-scorers.html',
  styleUrl: './top-scorers.scss'
})
export class TopScorers implements OnInit {
  #topScorersService = inject(TopScorersService);
  topScorers = signal<TopScorer[]>([]);
  isFetching = signal(false)
  error = signal<string | null>(null);
  #destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['rank', 'name', 'goals', 'assists'];

  ngOnInit() {
    this.isFetching.set(true);
    this.error.set('');
    const sub = this.#topScorersService.getRanking(5)
      .subscribe({
        next: (data: TopScorer[]) => {
          this.topScorers.set(data);
          this.error.set(null);
        },
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
    });
  }
}
