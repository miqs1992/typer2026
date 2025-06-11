import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { UpdateUserData, User } from '../users.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues } from '../../../../helpers/equal-values.validator';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatHint, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-edit-user',
  imports: [
    MatProgressSpinner,
    MatButton,
    MatCheckbox,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatHint,
    RouterLink,
  ],
  templateUrl: './edit-user.html',
  styleUrl: '../new-user/new-user.scss',
})
export class EditUser implements OnInit {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #usersService = inject(UsersService);

  userId = input.required<string>();
  editedUser = signal<User | null>(null);

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
    isAdmin: new FormControl(false),
    hasPaid: new FormControl(false),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(8)],
      }),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.minLength(8)],
      }),
    }, { validators: equalValues('password', 'passwordConfirmation') }),
  });

  ngOnInit() {
    const sub = this.#usersService.getUser(this.userId()).subscribe({
      next: (user) => {
        this.editedUser.set(user);
        this.form.setValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          hasPaid: user.hasPaid,
          passwords: {
            password: '',
            passwordConfirmation: ''
          }
        })
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.#router.navigate(['admin', 'users'], { replaceUrl: true });
      }
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

    const updateData: UpdateUserData = {
      email: this.form.value.email!,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      isAdmin: this.form.value.isAdmin!,
      hasPaid: this.form.value.hasPaid!,
    }

    if (this.form.value.passwords!.password) {
      updateData.password = this.form.value.passwords!.password!;
      updateData.passwordConfirmation = this.form.value.passwords!.passwordConfirmation!;
    }

    this.#usersService.updateUser(this.userId(), updateData).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'users'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error creating user:', err);
      },
    })
  }
}

