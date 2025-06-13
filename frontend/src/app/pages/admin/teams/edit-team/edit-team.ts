import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { TeamsService } from '../teams.service';
import { Team } from '../teams.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-edit-team',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    AdminFormWrapperComponent
  ],
  templateUrl: './edit-team.html',
  styleUrl: '../../admin-form.scss',
})
export class EditTeam implements OnInit {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #teamsService = inject(TeamsService);

  teamId = input.required<string>();
  editedTeam = signal<Team | null>(null);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    flag: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    winner: new FormControl(false)
  })

  ngOnInit() {
    const sub = this.#teamsService.getResource(this.teamId()).subscribe({
      next: (team) => {
        this.editedTeam.set(team);
        this.form.patchValue({
          name: team.name,
          flag: team.flag,
          winner: team.winner,
        });
      },
      error: (err) => {
        console.error('Error fetching team:', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    const sub = this.#teamsService.updateResource(this.teamId(), {
      name: this.form.value.name!,
      flag: this.form.value.flag!,
      winner: this.form.value.winner!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'teams'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error updating team:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
