import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { UpdateUserData } from './users.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #httpClient = inject(HttpClient);
  #snackBar = inject(MatSnackBar);

  updateProfile(data: UpdateUserData) {
    return this.#httpClient.patch('users/me', data).pipe(
      catchError((error: Error) => {
        this.#openSnackBar(`Failed to update profile. Please try again.`);
        throw error;
      })
    )
  }

  getIsBeforeFirstGame() {
    return this.#httpClient.get<{ isBeforeFirstGame: boolean }>('match-days/first').pipe(
      map((matchDay) => matchDay.isBeforeFirstGame),
      catchError((error: Error) => {
        this.#openSnackBar(`Failed to check game status. Please try again.`);
        throw error;
      })
    );
  }

  #openSnackBar(message: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
