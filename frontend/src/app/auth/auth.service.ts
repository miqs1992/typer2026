import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../core/services/storage/storage.service';
import { StorageKey } from '../core/services/storage/storage.model';
import { Profile } from './auth.model';
import { currentUserMock } from './auth.mock';
import { delay, of, tap } from 'rxjs';
import { rankingDataMock } from '../pages/ranking/ranking-data.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #token = signal<string>('');
  #storage = inject(StorageService);
  isLoggedIn = computed(() => this.#token().length > 0);
  #currentUser = signal<Profile | null>(null);

  constructor() {
    const token = this.#storage.read(StorageKey.AUTH_TOKEN);
    console.log('Auth Service Initialized, Token:', token);
    if (token) {
      this.#token.set(token);
    }
  }

  public async login(email: string, password: string) {
    try {
      const token = await Promise.resolve(new Date().getTime().toString() + email + password);
      this.#token.set(token);
      this.#storage.save(StorageKey.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error during login request', error);
      return Promise.reject(error);
    }
  }

  public getToken() {
    return this.#token.asReadonly();
  }

  public logout() {
    this.#token.set('');
    this.#storage.remove(StorageKey.AUTH_TOKEN);
    this.#currentUser.set(null);
  }

  public getCurrentUser() {
    if(!this.isLoggedIn()) {
      throw new Error('User is not logged in');
    }

    if (this.#currentUser()) {
      return this.#currentUser()!;
    }

    return of(currentUserMock).pipe(delay(100)).pipe(
      tap(data => this.#currentUser.set(data))
    );
  }
}
