import { Injectable, signal } from '@angular/core';
import { TopScorer } from './top-scorers.model';
import { delay, of, tap } from 'rxjs';
import { topScorersMock } from './top-scorers.mock';

@Injectable({
  providedIn: 'root'
})
export class TopScorersService {
  #topScorers = signal<TopScorer[]>([]);
  loadedTopScorers = this.#topScorers.asReadonly();

  loadTopScorers() {
    return of(topScorersMock).pipe(delay(1000)).pipe(
      tap(data => this.#topScorers.set(data))
    );
  }
}
