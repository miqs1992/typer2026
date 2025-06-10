import { computed, inject, Injectable, signal } from '@angular/core';
import { CreateUserData, User, UserServiceState } from './users.model';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #httpClient = inject(HttpClient);
  readonly #state = signal<UserServiceState>({
    users: [],
    isLoading: false,
    error: null,
  });

  readonly users = computed(() => this.#state().users);
  readonly isLoading = computed(() => this.#state().isLoading);
  readonly error = computed(() => this.#state().error);

  loadUsers(): void {
    this.#updateState({ isLoading: true, error: null });

    this.#httpClient
      .get<{users: User[]}>('admin/users')
      .pipe(
        map((data) => {
          this.#updateState({ users: data.users, isLoading: false });
          return data;
        }),
        catchError((error: Error) => {
          this.#updateState({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }),
        finalize(() => {
          this.#updateState({ isLoading: false });
        })
      )
      .subscribe();
  }

  createUser(data: CreateUserData) {
    return this.#httpClient.post('admin/users', data)
  }

  #updateState(partialState: Partial<UserServiceState>): void {
    this.#state.update((state) => ({
      ...state,
      ...partialState,
    }));
  }
}
