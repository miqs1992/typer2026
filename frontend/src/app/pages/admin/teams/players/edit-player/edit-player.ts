import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlayersService } from '../../players.service';
import { Player } from '../players.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-player',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatCheckbox
  ],
  templateUrl: './edit-player.html',
  styleUrl: '../../../admin-form.scss'
})
export class EditPlayer implements OnInit {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #playersService = inject(PlayersService);

  readonly teamId = input.required<string>();
  readonly playerId = input.required<string>();
  editedPlayer =  signal<Player | null>(null);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    goals: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    assists: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    king: new FormControl(false),
  })

  ngOnInit() {
    this.#playersService.setTeam(this.teamId());
    const sub = this.#playersService.getResource(this.playerId()).subscribe({
      next: (player) => {
        this.editedPlayer.set(player);
        this.form.patchValue({
          name: player.name,
          goals: player.goals,
          assists: player.assists,
          king: player.king,
        });
      },
      error: (err) => {
        console.error('Error fetching player:', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.#playersService.setTeam(this.teamId());
    const sub = this.#playersService.updateResource(this.playerId(), {
      name: this.form.value.name!,
      goals: this.form.value.goals!,
      assists: this.form.value.assists!,
      king: this.form.value.king!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'teams', this.teamId(), 'players'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error updating player:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
