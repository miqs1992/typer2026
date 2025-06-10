import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFormField,
    MatButton
  ],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss'
})
export class NewUser {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #usersService = inject(UsersService);

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
    }, { validators: this.equalValues('password', 'passwordConfirmation') }),
  });

  equalValues(control1Name: string, control2Name: string) {
    return (group: AbstractControl) => {
      const value1 = group.get(control1Name)?.value;
      const value2 = group.get(control2Name)?.value;
      return value1 === value2 ? null : { valuesMismatch: true };
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const sub = this.#usersService.createUser({
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
