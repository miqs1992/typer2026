import { FormControl, FormGroup, Validators } from '@angular/forms';

export const initMatchForm = () => new FormGroup({
  firstTeamId: new FormControl('', {
    validators: [Validators.required],
  }),
  secondTeamId: new FormControl('', {
    validators: [Validators.required],
  }),
  startsAtDate: new FormControl<Date>(new Date(), {
    validators: [Validators.required],
  }),
  startsAtTime: new FormControl<Date>(new Date(2025, 1,1, 18), {
    validators: [Validators.required],
  }),
})
