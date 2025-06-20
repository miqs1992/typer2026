import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../core/services/storage/storage.service';
import { StorageKey } from '../core/services/storage/storage.model';
import { Profile, SignInResponse } from './auth.model';
import { currentUserMock } from './auth.mock';
import { catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #token = signal<string>('');
  #storage = inject(StorageService);
  #httpClient = inject(HttpClient);
  #router = inject(Router);
  isLoggedIn = computed(() => this.#token().length > 0);
  #currentUser = signal<Profile | null>(null);
  loadedCurrentUser = this.#currentUser.asReadonly();

  constructor() {
    const token = this.#storage.read(StorageKey.AUTH_TOKEN);
    console.log('AuthService initialized, token:', token);
    if (token) {
      this.#token.set(token);
    }
  }

  public login(email: string, password: string) {
    return this.#httpClient.post<SignInResponse>('auth/login', { email, password })
      .pipe(tap(res => {
        this.#token.set(res.access_token);
        this.#storage.save(StorageKey.AUTH_TOKEN, res.access_token);
      }))
  }

  public getToken() {
    return this.#token.asReadonly();
  }

  public logout() {
    this.#token.set('');
    this.#storage.remove(StorageKey.AUTH_TOKEN);
    this.#currentUser.set(null);
  }

  public loadCurrentUser() {
    if(!this.isLoggedIn()) {
      throw new Error('User is not logged in');
    }

    if (this.#currentUser()) {
      return this.#currentUser()!;
    }

    return this.#httpClient.get<Profile>('users/me').pipe(
      map(fetchedUserData => {
        const fullProfile = { ...currentUserMock, ...fetchedUserData };
        this.#currentUser.set(fullProfile);
        return fullProfile;
      }),
      catchError((err) => {
        this.logout();
        this.#router.navigate(['/auth/login']);
        throw new Error('Failed to load current user: ' + err.message);
      })
    )
  }
}
