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
  topScorers = this.#topScorersService.loadedTopScorers;
  isFetching = signal(false)
  error = signal<string | null>(null);
  #destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['rank', 'name', 'goals', 'assists'];

  ngOnInit() {
    this.isFetching.set(true);
    this.error.set('');
    const sub = this.#topScorersService.loadTopScorers()
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
    });
  }
}
