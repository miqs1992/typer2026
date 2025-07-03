import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PublicPlayer, PublicTeam } from './selector.model';

@Component({
  selector: 'app-team-selector',
  template: '<div>Team Selector Mock</div>'
})
export class MockTeamSelectorComponent {
  control = input.required<FormControl>();
  placeholder = input<string>('');
}

@Component({
  selector: 'app-player-selector',
  template: '<div>Player Selector Mock</div>'
})
export class MockPlayerSelectorComponent {
  control = input.required<FormControl>();
  placeholder = input<string>('');
}

export const mockTeams: PublicTeam[] = [
  { id: '1', name: 'Poland', flag: 'pl' },
  { id: '2', name: 'England', flag: 'gb-eng' },
];

export const mockPlayers: PublicPlayer[] = [
  { id: '1', name: 'Pl1', goals: 1, assists: 5, team: mockTeams[0] },
  { id: '2', name: 'Pl2', goals: 0, assists: 2, team: mockTeams[1] },
];
