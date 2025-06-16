import { computed, Injectable, signal } from '@angular/core';
import { DataService } from '../../data.service';
import { MatchDay, CreateMatchDayDto } from './match-days.model';

@Injectable({
  providedIn: 'root'
})
export class MatchDaysService extends DataService<MatchDay, CreateMatchDayDto> {
  path = signal('admin/rounds/:roundId/match-days');
  resourceName = 'match days';

  readonly matchDays = computed(() => this.state().data);

  setRound(roundId: string): void {
    this.path.set(`admin/rounds/${roundId}/match-days`);
  }
}
