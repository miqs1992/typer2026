import { Component, DestroyRef, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoundsService } from '../rounds.service';
import { RoundStageLabels } from '../rounds.model';
import { MatOption, MatSelect } from '@angular/material/select';
import { initRoundForm } from '../rounds.form';

@Component({
  selector: 'app-new-round',
  templateUrl: './new-round.html',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  styleUrl: '../../admin-form.scss',
})
export class NewRound {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #roundsService = inject(RoundsService);

  form = initRoundForm();

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const sub = this.#roundsService.createResource({
      name: this.form.value.name!,
      order: this.form.value.order!,
      scoreFactor: this.form.value.scoreFactor!,
      stage: this.form.value.stage!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'rounds'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating team:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };

  protected readonly Object = Object;
  protected readonly RoundStageLabels = RoundStageLabels;
}
