import { computed, Injectable } from '@angular/core';
import { CreateTeamData, Team, UpdateTeamData } from './teams.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends DataService<Team, CreateTeamData, UpdateTeamData> {
  path = 'admin/teams';

  readonly teams =  computed(() => this.state().data);
}
