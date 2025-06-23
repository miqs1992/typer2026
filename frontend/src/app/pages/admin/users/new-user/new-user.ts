import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { UsersAdminService } from '../users-admin.service';
import { Router } from '@angular/router';
import { equalValues } from '../../../../helpers/equal-values.validator';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-new-user',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    AdminFormWrapperComponent
  ],
  templateUrl: './new-user.html',
  styleUrl: '../../admin-form.scss'
})
export class NewUser {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #usersService = inject(UsersAdminService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    }, { validators: equalValues('password', 'passwordConfirmation') }),
  });

  onSubmit() {
    const sub = this.#usersService.createResource({
      email: this.form.value.email!,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      password: this.form.value.passwords!.password!,
      passwordConfirmation: this.form.value.passwords!.passwordConfirmation!,
    }).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'users'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating user:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
