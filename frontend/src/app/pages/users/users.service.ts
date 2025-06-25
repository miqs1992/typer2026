import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
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

  #openSnackBar(message: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
