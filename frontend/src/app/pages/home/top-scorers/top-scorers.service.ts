import { inject, Injectable } from '@angular/core';
import { TopScorer } from './top-scorers.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopScorersService {
  #httpClient = inject(HttpClient);

  getRanking(limit?: number) {
    const params = limit ? { limit: limit.toString() } : undefined;

    return this.#httpClient.get<{ items: TopScorer[] }>(
      'teams/scorers-ranking',
      { params }
    ).pipe(
      map((data) => data.items),
    )
  }
}
