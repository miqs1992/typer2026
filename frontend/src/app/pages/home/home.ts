import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Profile } from '../../auth/auth.model';
import { Alert } from '../../shared/alert/alert';

@Component({
  selector: 'app-home',
  imports: [
    Alert,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  currentUser = signal<Profile | null>(null);
  #destroyRef = inject(DestroyRef);
  showAlert = computed(() => Boolean(this.currentUser()) && (
    this.currentUser()!.topScorer === null || this.currentUser()!.winner === null)
  )

  ngOnInit() {
    const userSub = this.#activatedRoute.data.subscribe(data => {
      if (data['currentUser']) {
        this.currentUser.set(data['currentUser']);
      } else {
        this.currentUser.set(null);
      }
    })

    this.#destroyRef.onDestroy(() => {
      userSub.unsubscribe();
    })
  }
}
