import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersAdminService } from '../users-admin.service';
import { UpdateUserData, User } from '../users.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput } from '@angular/material/input';
import { AdminFormWrapperComponent } from '../../../../shared/admin-form-wrapper/admin-form-wrapper.component';

@Component({
  selector: 'app-edit-user',
  imports: [
    MatProgressSpinner,
    MatCheckbox,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    AdminFormWrapperComponent
  ],
  templateUrl: './edit-user.html',
  styleUrl: '../../admin-form.scss',
})
export class EditUser implements OnInit {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #usersService = inject(UsersAdminService);

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
  });

  ngOnInit() {
    const sub = this.#usersService.getResource(this.userId()).subscribe({
      next: (user) => {
        this.editedUser.set(user);
        this.form.setValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          hasPaid: user.hasPaid,
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
    const updateData: UpdateUserData = {
      email: this.form.value.email!,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      isAdmin: this.form.value.isAdmin!,
      hasPaid: this.form.value.hasPaid!,
    }

    const sub = this.#usersService.updateResource(this.userId(), updateData).subscribe({
      next: () => {
        this.#router.navigate(['admin', 'users'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  };
}
