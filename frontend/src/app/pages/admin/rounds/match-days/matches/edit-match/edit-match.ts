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
import { Match } from '../matches.model';
import { combineDateTime } from '../../../../../../shared/dates/combine-date-time';

@Component({
  selector: 'app-edit-match',
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
  templateUrl: './edit-match.html',
  styleUrl: '../../../../admin-form.scss',
})
export class EditMatch implements OnInit {
  #destroyRef = inject(DestroyRef);
  #matchesService = inject(MatchesService);
  #router = inject(Router);
  readonly roundId = input.required<string>();
  readonly matchDayId = input.required<string>();
  readonly matchId = input.required<string>();
  readonly match = signal<Match | null>(null);

  form = initMatchForm();

  ngOnInit() {
    this.#matchesService.setMatchDay(this.matchDayId());
    const sub = this.#matchesService.getResource(this.matchId()).subscribe({
      next: (match) => {
        this.match.set(match);

        // Initialize form with match data
        this.form.setValue({
          firstTeamId: match.firstTeam.id,
          secondTeamId: match.secondTeam.id,
          startsAtDate: new Date(match.startsAt),
          startsAtTime: new Date(match.startsAt),
          firstTeamResult: match.firstTeamResult,
          secondTeamResult: match.secondTeamResult,
        })

        // Extract time from startsAt for the time picker
        if (match.startsAt) {
          const startsAtDate = new Date(match.startsAt);
          this.form.controls.startsAtTime.setValue(startsAtDate);
        }
      },
      error: (err) => {
        console.error('Error fetching match:', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.#matchesService.setMatchDay(this.matchDayId());

    const startsAt = combineDateTime(
      this.form.value.startsAtDate!,
      this.form.value.startsAtTime!
    );

    const sub = this.#matchesService.updateResource(this.matchId(), {
      firstTeamId: this.form.value.firstTeamId || '',
      secondTeamId: this.form.value.secondTeamId || '',
      startsAt,
      firstTeamResult: this.form.value.firstTeamResult || 0,
      secondTeamResult: this.form.value.secondTeamResult || 0,
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
        console.error('Error updating match:', err);
      },
      complete: () => sub.unsubscribe(),
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
