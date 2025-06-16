import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatchDaysService } from '../match-days.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminFormWrapperComponent } from '../../../../../shared/admin-form-wrapper/admin-form-wrapper.component';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { initMatchDayForm } from '../match-day.form';

@Component({
  selector: 'app-new-match-day',
  imports: [
    AdminFormWrapperComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './new-match-day.html',
  styleUrl: '../../../admin-form.scss',

})
export class NewMatchDay {
  #destroyRef = inject(DestroyRef);
  #matchDaysService = inject(MatchDaysService);
  #router = inject(Router);
  readonly roundId = input.required<string>();

  form = initMatchDayForm();

  onSubmit() {
    this.#matchDaysService.setRound(this.roundId());

    const stopBetDate = this.form.value.stopBetDate!;
    const stopBetTime = this.form.value.stopBetTime!;
    const realStopBetTime = new Date(
      stopBetDate.getFullYear(),
      stopBetDate.getMonth(),
      stopBetDate.getDate(),
      stopBetTime.getHours(),
      stopBetTime.getMinutes(),
    );

    const sub = this.#matchDaysService.createResource({
      dayNumber: this.form.value.dayNumber!,
      stopBetTime: realStopBetTime,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin/rounds', this.roundId(), 'match-days'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating match day:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
