import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicMatchDay } from './home.dto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
}
