import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../core/services/storage/storage';
import { StorageKey } from '../core/services/storage/storage.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #token = signal<string>('');
  #storage = inject(StorageService);
  isLoggedIn = computed(() => this.#token().length > 0);

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
  }
}
