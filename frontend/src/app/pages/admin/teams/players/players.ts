import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { PlayersService } from '../players.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FlagIcon } from '../../../../shared/flag-icon/flag-icon';
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

@Component({
  selector: 'app-players',
  imports: [
    MatFabButton,
    MatIcon,
    MatProgressSpinner,
    RouterLink,
    FlagIcon,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './players.html',
  styleUrl: './players.scss'
})
export class Players implements OnInit {
  readonly teamId = input.required<string>();
  readonly #onDestroy = inject(DestroyRef);
  readonly #playersService = inject(PlayersService);

  // Computed values
  readonly players = this.#playersService.players;
  readonly isLoading = this.#playersService.isLoading;
  readonly error = this.#playersService.error;

  title = computed(() =>
    this.players().length === 0 ?
      'Players' :
      `Players of team ${this.players()[0].team.name}`
  );

  displayedColumns = ['name', 'goals', 'assists', 'king', 'actions'];

  ngOnInit(): void {
    this.#playersService.setTeam(this.teamId());
    this.#playersService.loadResources();
  }

  deletePlayer(playerId: string): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.#playersService.setTeam(this.teamId());
      const sub = this.#playersService.deleteResource(playerId).subscribe({
        next: () => {
          console.log(`Player with ID ${playerId} deleted successfully.`);
          this.#playersService.loadResources(); // Reload users after deletion
        },
        error: (err) => {
          console.error(`Error deleting player with ID ${playerId}:`, err);
        }
      });

      this.#onDestroy.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }
}
