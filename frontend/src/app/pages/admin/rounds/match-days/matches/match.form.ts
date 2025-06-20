import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Match } from './matches.model';

export const initMatchForm = (match?: Match) => new FormGroup({
  firstTeamId: new FormControl(match?.firstTeam?.id || '', {
    validators: [Validators.required],
  }),
  secondTeamId: new FormControl(match?.secondTeam?.id || '', {
    validators: [Validators.required],
  }),
  startsAtDate: new FormControl<Date>(match?.startsAt ? new Date(match.startsAt) : new Date(), {
    validators: [Validators.required],
  }),
  startsAtTime: new FormControl<Date>(match?.startsAt ? new Date(match.startsAt) : new Date(2025, 1,1, 18), {
    validators: [Validators.required],
  }),
  firstTeamResult: new FormControl(match?.firstTeamResult ?? 0, {
    validators: [Validators.required, Validators.min(0)],
  }),
  secondTeamResult: new FormControl(match?.secondTeamResult ?? 0, {
    validators: [Validators.required, Validators.min(0)],
  }),
})
