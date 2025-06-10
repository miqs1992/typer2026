import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';
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
  readonly #usersService = inject(UsersService);

  // Computed values
  readonly users = this.#usersService.users;
  readonly isLoading = this.#usersService.isLoading;
  readonly error = this.#usersService.error;

  displayedColumns = ['name', 'email', 'isAdmin', 'hasPaid', 'leagueRank'];

  ngOnInit(): void {
    this.#usersService.loadUsers();
  }
}
