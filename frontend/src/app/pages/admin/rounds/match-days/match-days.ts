import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatchDaysService } from './match-days.service';
import { DatePipe } from '@angular/common';
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
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-match-days',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    RouterLink,
    MatHeaderCellDef,
    DatePipe,
  ],
  templateUrl: './match-days.html',
  styleUrl: './match-days.scss'
})
export class MatchDays {
  #destroyRef = inject(DestroyRef);
  #matchDaysService = inject(MatchDaysService);
  readonly roundId = input.required<string>();

  // Computed values
  readonly matchDays = this.#matchDaysService.matchDays;
  readonly isLoading = this.#matchDaysService.isLoading;
  readonly error = this.#matchDaysService.error;

  displayedColumns = ['name', 'stopBetTime', 'actions'];

  ngOnInit(): void {
    this.#matchDaysService.setRound(this.roundId());
    this.#matchDaysService.loadResources();
  }

  deleteMatchDay(id: string) {
    if (confirm('Are you sure you want to delete this round?')) {
      this.#matchDaysService.setRound(this.roundId());
      const sub = this.#matchDaysService.deleteResource(id).subscribe({
        next: () => {
          console.log(`Match days with ID ${id} deleted successfully.`);
        },
        error: (err) => {
          console.error('Error deleting match day:', err);
        }
      });

      this.#destroyRef.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }
}
