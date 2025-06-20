import { computed, Injectable, signal } from '@angular/core';
import { DataService } from '../../../data.service';
import { Match, CreateMatchDto, UpdateMatchDto } from './matches.model';

@Injectable({
  providedIn: 'root'
})
export class MatchesService extends DataService<Match, CreateMatchDto, UpdateMatchDto> {
  path = signal('admin/match-days/:match-day-id/matches');
  resourceName = 'match days';

  readonly matches = computed(() => this.state().data);

  setMatchDay(matchDayId: string): void {
    this.path.set(`admin/match-days/${matchDayId}/matches`);
  }
}
