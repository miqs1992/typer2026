import { Injectable, signal } from '@angular/core';
import { RankedUserData } from './ranking.model';
import { rankingDataMock } from './ranking-data.mock';
import { of, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  #ranking = signal<RankedUserData[]>([]);
  loadedRanking = this.#ranking.asReadonly();

  loadFullRanking() {
   return of(rankingDataMock).pipe(delay(1000)).pipe(
     tap(data => this.#ranking.set(data))
   );
  }
}
