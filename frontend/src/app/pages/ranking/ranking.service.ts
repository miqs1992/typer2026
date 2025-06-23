import { inject, Injectable } from '@angular/core';
import { RankedUserData } from './ranking.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  #httpClient = inject(HttpClient);

  getRanking(limit?: number) {
    const params = limit ? { limit: limit.toString() } : undefined;

    return this.#httpClient.get<{ items: RankedUserData[] }>(
      'users/ranking',
      { params }
    ).pipe(
      map((data) => data.items),
    )
  }
}
