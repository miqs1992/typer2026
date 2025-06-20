import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MatchesService } from './matches.service';
import { DatePipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FlagIcon } from '../../../../../shared/flag-icon/flag-icon';

@Component({
  selector: 'app-matches',
  imports: [
    DatePipe,
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
    FlagIcon
  ],
  templateUrl: './matches.html',
  styleUrl: './matches.scss'
})
export class Matches implements OnInit {
  #destroyRef = inject(DestroyRef);
  #matchesService = inject(MatchesService);
  readonly matchDayId = input.required<string>();

  // Computed values
  readonly matches = this.#matchesService.matches;
  readonly isLoading = this.#matchesService.isLoading;
  readonly error = this.#matchesService.error;

  displayedColumns = ['firstTeam', 'secondTeam', 'startsAt', 'actions'];

  ngOnInit(): void {
    this.#matchesService.setMatchDay(this.matchDayId());
    this.#matchesService.loadResources();
  }

  deleteMatch(id: string) {
    if (confirm('Are you sure you want to delete this round?')) {
      this.#matchesService.setMatchDay(this.matchDayId());
      const sub = this.#matchesService.deleteResource(id).subscribe({
        next: () => {
          console.log(`Match with ID ${id} deleted successfully.`);
        },
        error: (err) => {
          console.error('Error deleting match:', err);
        }
      });

      this.#destroyRef.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }
}
