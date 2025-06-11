import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TeamsService } from './teams.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FlagIcon } from '../../../shared/flag-icon/flag-icon';

@Component({
  selector: 'app-teams',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatHeaderCell,
    MatIcon,
    MatProgressSpinner,
    MatTable,
    RouterLink,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    FlagIcon,
    MatIconButton
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.scss'
})
export class Teams implements OnInit {
  #onDestroy = inject(DestroyRef);
  readonly #teamsService = inject(TeamsService);

  // Computed values
  readonly teams = this.#teamsService.teams;
  readonly isLoading = this.#teamsService.isLoading;
  readonly error = this.#teamsService.error;

  displayedColumns = ['name', 'flag', 'winner', 'actions'];

  ngOnInit(): void {
    this.#teamsService.loadResources();
  }

  deleteTeam(id: string) {
    if (confirm('Are you sure you want to delete this team?')) {
      const sub = this.#teamsService.deleteResource(id).subscribe({
        next: () => {
          console.log(`Team with ID ${id} deleted successfully.`);
          this.#teamsService.loadResources(); // Reload users after deletion
        },
        error: (err) => {
          console.error(`Error deleting team with ID ${id}:`, err);
        }
      });

      this.#onDestroy.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }
}
