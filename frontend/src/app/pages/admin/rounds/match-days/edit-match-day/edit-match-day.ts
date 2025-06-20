import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { AdminFormWrapperComponent } from '../../../../../shared/admin-form-wrapper/admin-form-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatchDaysService } from '../match-days.service';
import { Router } from '@angular/router';
import { initMatchDayForm } from '../match-day.form';
import { MatchDay } from '../match-days.model';
import { combineDateTime } from '../../../../../shared/dates/combine-date-time';

@Component({
  selector: 'app-edit-match-day',
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
  templateUrl: './edit-match-day.html',
  styleUrl: '../../../admin-form.scss',
})
export class EditMatchDay implements OnInit {
  #destroyRef = inject(DestroyRef);
  #matchDaysService = inject(MatchDaysService);
  #router = inject(Router);
  readonly roundId = input.required<string>();
  readonly matchDayId = input.required<string>();
  editedMatchDay = signal<MatchDay | null>(null);

  form = initMatchDayForm();

  ngOnInit() {
    this.#matchDaysService.setRound(this.roundId());
    const sub = this.#matchDaysService.getResource(this.matchDayId()).subscribe({
      next: (day) => {
        this.editedMatchDay.set(day);
        this.form.patchValue({
          dayNumber: day.dayNumber,
          stopBetDate: new Date(day.stopBetTime),
          stopBetTime: new Date(day.stopBetTime),
        });
      },
      error: (err) => {
        console.error('Error fetching round:', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    this.#matchDaysService.setRound(this.roundId());

    const sub = this.#matchDaysService.updateResource(this.matchDayId(), {
      dayNumber: this.form.value.dayNumber!,
      stopBetTime: combineDateTime(this.form.value.stopBetDate!, this.form.value.stopBetTime!),
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin/rounds', this.roundId(), 'match-days'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error updating match day:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
