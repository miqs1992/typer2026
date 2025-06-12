import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlayersService } from '../../players.service';

@Component({
  selector: 'app-new-player',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './new-player.html',
  styleUrl: '../../../admin-form.scss'
})
export class NewPlayer {
  readonly teamId = input.required<string>();
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #playersService = inject(PlayersService);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.#playersService.setTeam(this.teamId());
    const sub = this.#playersService.createResource({
      name: this.form.value.name!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin/teams', this.teamId(), 'players'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating player:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
