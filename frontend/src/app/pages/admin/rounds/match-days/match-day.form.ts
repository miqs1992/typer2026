import { FormControl, FormGroup, Validators } from '@angular/forms';

export const initMatchDayForm = () => new FormGroup({
  dayNumber: new FormControl(0, {
    validators: [Validators.required],
  }),
  stopBetDate: new FormControl<Date>(new Date(), {
    validators: [Validators.required],
  }),
  stopBetTime: new FormControl<Date>(new Date(2025, 1,1, 18), {
    validators: [Validators.required],
  }),
})
