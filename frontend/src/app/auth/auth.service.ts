import { inject, Injectable, signal } from '@angular/core';
import { Profile } from './auth.model';
import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clerk } from '@clerk/clerk-js';
import { toObservable } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #httpClient = inject(HttpClient);

  #isLoading = signal(true);
  #clerk = signal<Clerk | null>(null);
  #currentUser = signal<Profile | null>(null);

  isLoading$ = toObservable(this.#isLoading);
  loadedCurrentUser = this.#currentUser.asReadonly();

  constructor() {
    this.init()
  }

  private async init() {
    if(!this.#isLoading()) {
      return;
    }

    const instance = new Clerk(environment.clerkPublicKey)
    await instance.load({});
    this.#clerk.set(instance);
    if(instance.session) {
      this.loadCurrentUser().subscribe();
    } else {
      this.#isLoading.set(false);
    }
  }

  public redirectToLogin() {
    return this.#clerk()!.redirectToSignIn();
  }

  public logout() {
    this.#currentUser.set(null);
    return this.#clerk()!.signOut();
  }

  public async getToken() {
    const session = this.#clerk()?.session;
    if (!session) {
      return null;
    }

    return session.getToken();
  }

  public loadCurrentUser() {
    if (this.#currentUser()) {
      return of(this.#currentUser()!);
    }

    console.log('Loading current user from API...');

    return this.#httpClient.get<Profile>('users/me').pipe(
      map(fetchedUserData => {
        this.#currentUser.set(fetchedUserData);
        this.#isLoading.set(false);
        return fetchedUserData;
      }),
      catchError((err) => {
        this.logout();
        throw new Error('Failed to load current user: ' + err.message);
      })
    )
  }
}
