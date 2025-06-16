import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RoundsService } from './rounds.service';
import { RoundStage } from './rounds.model';
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { TagComponent } from '../../../shared/tag/tag';

@Component({
  selector: 'app-admin-rounds',
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
    DecimalPipe,
    TagComponent
  ],
  templateUrl: './rounds.html',
  styleUrl: './rounds.scss'
})
export class Rounds implements OnInit {
  #onDestroy = inject(DestroyRef);
  readonly #roundsService = inject(RoundsService);

  // Computed values
  readonly rounds = this.#roundsService.rounds;
  readonly isLoading = this.#roundsService.isLoading;
  readonly error = this.#roundsService.error;

  displayedColumns = ['name', 'order', 'scoreFactor', 'stage', 'actions'];

  ngOnInit(): void {
    this.#roundsService.loadResources();
  }

  deleteRound(id: string) {
    if (confirm('Are you sure you want to delete this round?')) {
      const sub = this.#roundsService.deleteResource(id).subscribe({
        next: () => {
          console.log(`Round with ID ${id} deleted successfully.`);
        },
        error: (err) => {
          console.error('Error deleting round:', err);
        }
      });

      this.#onDestroy.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }

  protected readonly RoundStage = RoundStage;
}
