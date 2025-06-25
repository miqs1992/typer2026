import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UsersAdminService } from './users-admin.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
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
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    MatProgressSpinner,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIcon,
    MatIconButton,
    RouterLink,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  #onDestroy = inject(DestroyRef);
  readonly #usersService = inject(UsersAdminService);

  // Computed values
  readonly users = this.#usersService.users;
  readonly isLoading = this.#usersService.isLoading;
  readonly error = this.#usersService.error;

  displayedColumns = ['name', 'email', 'isAdmin', 'hasPaid', 'leagueRank', 'actions'];

  ngOnInit(): void {
    this.#usersService.loadResources();
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      const sub = this.#usersService.deleteResource(userId).subscribe({
        next: () => {
          console.log(`User with ID ${userId} deleted successfully.`);
          this.#usersService.loadResources(); // Reload users after deletion
        },
        error: (err) => {
          console.error(`Error deleting user with ID ${userId}:`, err);
        }
      });

      this.#onDestroy.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }
}
