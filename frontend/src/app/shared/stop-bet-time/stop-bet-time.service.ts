import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PublicMatchDay } from './stop-bet-time.dto';

@Injectable({
  providedIn: 'root'
})
export class StopBetTimeService {
  #httpClient = inject(HttpClient);

  getNextStopBetTime() {
    return this.#httpClient.get<PublicMatchDay>('match-days/next').pipe(
      map((day: PublicMatchDay | null) => {
        if (!day) {
          return null;
        }
        return day.stopBetTime;
      })
    )
  }

  getIsBeforeFirstGame() {
    return this.#httpClient.get<PublicMatchDay & { isBeforeFirstGame: boolean }>('match-days/first').pipe(
      map((matchDay) => matchDay.isBeforeFirstGame),
    );
  }
}
