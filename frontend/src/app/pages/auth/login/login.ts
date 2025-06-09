import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatError,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatButton,
    MatInput,
    MatFormField,
    MatCardActions,
    MatCardHeader
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  #authService = inject(AuthService);
  #router = inject(Router);
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  #destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.errorMessage.set('');
    if (this.#authService.isLoggedIn()) {
      this.navigateTo();
    }
  }

  public async login() {
    const sub = this.#authService.login(
      this.email(),
      this.password(),
    ).subscribe({
      next: () => this.navigateTo(),
      error: (err) => {
        this.errorMessage.set('Wrong Credentials!');
        console.error('Unable to Login!\n', err);
      },
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }

  public navigateTo(url?: string) {
    url = url || '';
    this.#router.navigate([url], { replaceUrl: true });
  }
}
