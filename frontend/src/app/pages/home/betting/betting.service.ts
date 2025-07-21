import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NextMatchDayResponse, UpdateBet } from './betting.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BettingService {
  #httpClient = inject(HttpClient);
  #snackBar = inject(MatSnackBar);

  getNextMatchDay() {
    return this.#httpClient.get<NextMatchDayResponse>(
      'betting/next'
    )
  }

  getPreviousMatchDay() {
    return this.#httpClient.get<NextMatchDayResponse>(
      'betting/previous'
    )
  }

  updateBets(matchDayId: string, bets: UpdateBet[]) {
    return this.#httpClient.post<NextMatchDayResponse>(
      `betting/${matchDayId}`,
      { bets }
    ).pipe(
      tap(() => {
        this.#openSnackBar('Bets updated successfully!', 'snackbar-success');
      }),
      catchError((err) => {
        this.#openSnackBar('Failed to update bets!');
        console.error('Error updating bets:', err);
        return throwError(() => err);
      }),
    )
  }

  #openSnackBar(message: string, panelClass?: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: panelClass ? [panelClass] : []
    });
  }
}
