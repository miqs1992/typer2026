import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { TeamsService } from '../teams.service';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-new-team',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    AdminFormWrapperComponent
  ],
  styleUrl: '../../admin-form.scss',
  templateUrl: './new-team.html',
})
export class NewTeam {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #teamsService = inject(TeamsService);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    flag: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    })
  })

  onSubmit() {
    const sub = this.#teamsService.createResource({
      name: this.form.value.name!,
      flag: this.form.value.flag!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'teams'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating team:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };

}
