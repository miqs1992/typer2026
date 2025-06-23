import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Profile } from '../../../auth/auth.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues } from '../../../helpers/equal-values.validator';
import { UsersService } from '../users.service';
import { AdminFormWrapperComponent } from '../../../shared/admin-form-wrapper/admin-form-wrapper.component';
import { MatFormField, MatHint, MatInput } from '@angular/material/input';
import { TeamSelectorComponent } from '../../../shared/teams/team-selector/team-selector.component';
import { PlayerSelectorComponent } from '../../../shared/teams/player-selector/player-selector.component';
import { UpdateUserData } from '../users.model';

@Component({
  selector: 'app-edit-user',
  imports: [
    AdminFormWrapperComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TeamSelectorComponent,
    PlayerSelectorComponent,
    MatFormField,
    MatHint
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);
  #usersService = inject(UsersService);

  currentUser = signal<Profile | null>(null);
  isBeforeFirstGame = signal<boolean>(false);

  form = new FormGroup({
    winnerId: new FormControl(''),
    topScorerId: new FormControl(''),
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
    const userSub = this.#activatedRoute.data.subscribe(data => {
      if (data['currentUser']) {
        this.currentUser.set(data['currentUser']);
        this.form.patchValue({
          winnerId: data['currentUser'].winner?.id || '',
          topScorerId: data['currentUser'].topScorer?.id || '',
        });
      } else {
        this.currentUser.set(null);
      }
    })

    const isBeforeFirstGameSub = this.#usersService.getIsBeforeFirstGame().subscribe(
      result => this.isBeforeFirstGame.set(result)
    )

    this.#destroyRef.onDestroy(() => {
      userSub.unsubscribe();
      isBeforeFirstGameSub.unsubscribe();
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const userData: UpdateUserData = {
      password: this.form.value.passwords?.password || undefined,
      passwordConfirmation: this.form.value.passwords?.passwordConfirmation || undefined,
    }

    if(this.isBeforeFirstGame()) {
      userData.winnerId = this.form.value.winnerId || undefined;
      userData.topScorerId = this.form.value.topScorerId || undefined;
    }

    const sub = this.#usersService.updateProfile(userData).subscribe({
      next: () => {
        window.location.href = '/'; // hard reload to clear resolver
      },
      error: (err) => {
        console.error('Error updating team:', err);
      },
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
