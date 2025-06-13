import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RoundsService } from '../rounds.service';
import { Round, RoundStageLabels } from '../rounds.model';
import { initRoundForm } from '../rounds.form';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-edit-round',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    AdminFormWrapperComponent
  ],
  templateUrl: './edit-round.html',
  styleUrl: '../../admin-form.scss',
})
export class EditRound implements OnInit {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #roundsService = inject(RoundsService);

  roundId = input.required<string>();
  editedRound = signal<Round | null>(null);
  form = initRoundForm();

  ngOnInit() {
    const sub = this.#roundsService.getResource(this.roundId()).subscribe({
      next: (round) => {
        this.editedRound.set(round);
        this.form.patchValue({
          name: round.name,
          order: round.order,
          scoreFactor: round.scoreFactor,
          stage: round.stage,
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
    const sub = this.#roundsService.updateResource(this.roundId(), {
      name: this.form.value.name!,
      order: this.form.value.order!,
      scoreFactor: this.form.value.scoreFactor!,
      stage: this.form.value.stage!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'rounds'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error updating round:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };

  protected readonly RoundStageLabels = RoundStageLabels;
  protected readonly Object = Object;

}
