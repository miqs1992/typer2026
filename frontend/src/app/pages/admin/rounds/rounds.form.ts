import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoundStage } from './rounds.model';

export const initRoundForm = () => new FormGroup({
  name: new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
  }),
  order: new FormControl(0, {
    validators: [Validators.required, Validators.min(0)],
  }),
  scoreFactor: new FormControl(1.0, {
    validators: [Validators.required, Validators.min(1)],
  }),
  stage: new FormControl<RoundStage>(RoundStage.GROUP, {
    validators: [Validators.required],
  })
})
