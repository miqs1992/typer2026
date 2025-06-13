import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../../players.service';
import { AdminFormWrapperComponent } from '../../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-new-player',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    AdminFormWrapperComponent
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
