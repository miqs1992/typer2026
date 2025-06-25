import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Profile } from '../../../auth/auth.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { AdminFormWrapperComponent } from '../../../shared/admin-form-wrapper/admin-form-wrapper.component';
import { TeamSelectorComponent } from '../../../shared/teams/team-selector/team-selector.component';
import { PlayerSelectorComponent } from '../../../shared/teams/player-selector/player-selector.component';
import { UpdateUserData } from '../users.model';

@Component({
  selector: 'app-edit-user',
  imports: [
    AdminFormWrapperComponent,
    ReactiveFormsModule,
    TeamSelectorComponent,
    PlayerSelectorComponent
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

      if (data['isBeforeFirstGame'] !== undefined) {
        this.isBeforeFirstGame.set(data['isBeforeFirstGame']);
      } else {
        this.isBeforeFirstGame.set(false);
      }
    })

    this.#destroyRef.onDestroy(() => {
      userSub.unsubscribe();
    })
  }

  onSubmit() {
    if (this.form.invalid || !this.isBeforeFirstGame()) {
      console.log('Form is invalid');
      return;
    }

    const userData: UpdateUserData = {
      winnerId: this.form.value.winnerId || undefined,
      topScorerId: this.form.value.topScorerId || undefined
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
