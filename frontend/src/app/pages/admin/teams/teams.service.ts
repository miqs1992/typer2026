import { computed, Injectable, signal } from '@angular/core';
import { CreateTeamData, Team, UpdateTeamData } from './teams.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends DataService<Team, CreateTeamData, UpdateTeamData> {
  path = signal('admin/teams');
  resourceName = 'team';

  readonly teams =  computed(() => this.state().data);
}
