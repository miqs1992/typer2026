import { computed, Injectable, signal } from '@angular/core';
import { DataService } from '../data.service';
import { Round } from './rounds.model';

class CreateRoundData {
}

@Injectable({
  providedIn: 'root'
})
export class RoundsService extends DataService<Round, CreateRoundData> {
  path = signal('admin/rounds');
  resourceName = 'round';

  readonly rounds =  computed(() => this.state().data);
}
