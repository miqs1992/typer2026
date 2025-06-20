import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from '../matches.service';
import { initMatchForm } from '../match.form';
import { AdminFormWrapperComponent } from '../../../../../../shared/admin-form-wrapper/admin-form-wrapper.component';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TeamSelectorComponent } from '../../../../../../shared/teams/team-selector/team-selector.component';
import { MatchDay } from '../../match-days.model';
import { MatchDaysService } from '../../match-days.service';
import { combineDateTime } from '../../../../../../shared/dates/combine-date-time';

@Component({
  selector: 'app-new-match',
  imports: [
    AdminFormWrapperComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TeamSelectorComponent,
  ],
  templateUrl: './new-match.html',
  styleUrl: '../../../../admin-form.scss',
})
export class NewMatch implements OnInit {
  #destroyRef = inject(DestroyRef);
  #matchesService = inject(MatchesService);
  #matchDaysService = inject(MatchDaysService);
  #router = inject(Router);
  readonly roundId = input.required<string>();
  readonly matchDayId = input.required<string>();
  readonly matchDay = signal<MatchDay | null>(null);

  form = initMatchForm();

  ngOnInit() {
    this.#matchDaysService.setRound(this.roundId());
    const sub = this.#matchDaysService.getResource(this.matchDayId()).subscribe({
      next: (day) => {
        this.matchDay.set(day);
      },
      error: (err) => {
        console.error('Error fetching match day:', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    this.#matchesService.setMatchDay(this.matchDayId());

    const sub = this.#matchesService.createResource({
      firstTeamId: this.form.value.firstTeamId || '',
      secondTeamId: this.form.value.secondTeamId || '',
      startsAt: combineDateTime(new Date(this.matchDay()!.stopBetTime), this.form.value.startsAtTime!),
    }).subscribe({
      next: () => {
        this.#router.navigate([
          'admin/rounds',
          this.roundId(),
          'match-days',
          this.matchDayId(),
          'matches'
        ], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating match:', err);
      },
      complete: () => sub.unsubscribe(),
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
