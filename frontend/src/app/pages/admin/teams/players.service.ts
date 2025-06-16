import { computed, Injectable, signal } from '@angular/core';
import { DataService } from '../data.service';
import { CreatePlayerData, Player, UpdatePlayerData } from './players/players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends DataService<Player, CreatePlayerData, UpdatePlayerData> {
  path = signal('admin/teams/:teamId/players');
  resourceName = 'player';

  readonly players =  computed(() => this.state().data);

  setTeam(teamId: string): void {
    this.path.set(`admin/teams/${teamId}/players`);
  }
}
