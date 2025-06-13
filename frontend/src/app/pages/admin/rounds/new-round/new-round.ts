import { Component, DestroyRef, inject } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoundsService } from '../rounds.service';
import { RoundStageLabels } from '../rounds.model';
import { MatOption, MatSelect } from '@angular/material/select';
import { initRoundForm } from '../rounds.form';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-new-round',
  templateUrl: './new-round.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    AdminFormWrapperComponent
  ],
  styleUrl: '../../admin-form.scss',
})
export class NewRound {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #roundsService = inject(RoundsService);

  form = initRoundForm();

  onSubmit() {
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
        console.error('Error creating round:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };

  protected readonly Object = Object;
  protected readonly RoundStageLabels = RoundStageLabels;
}
