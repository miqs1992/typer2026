import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs';
import { DataServiceState } from './data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T, CT, UT = CT> {
  protected abstract path: Signal<string>;
  protected abstract resourceName: string;
  protected httpClient = inject(HttpClient);
  readonly #snackBar = inject(MatSnackBar);

  protected readonly state = signal<DataServiceState<T>>({
    data: [],
    isLoading: false,
    error: null,
  });


  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);

  loadResources(): void {
    this.#updateState({ isLoading: true, error: null });

    this.httpClient
      .get<{items: T[]}>(this.path())
      .pipe(
        map((data) => {
          this.#updateState({ data: data.items, isLoading: false });
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

  createResource(data: CT) {
    return this.httpClient.post(this.path(), data).pipe(
      catchError((error: Error) => {
        this.#openSnackBar(`Failed to create ${this.resourceName}. Please try again.`);
        throw error;
      })
    )
  }

  deleteResource(id: string) {
    return this.httpClient.delete(`${this.path()}/${id}`).pipe(
      catchError((error: Error) => {
        this.#openSnackBar(`Failed to delete ${this.resourceName}. Please try again.`);
        throw error;
      })
    )
  }

  getResource(id: string) {
    return this.httpClient.get<T>(`${this.path()}/${id}`).pipe(
        catchError((error: Error) => {
          this.#openSnackBar(`Failed to load ${this.resourceName}. Please try again.`);
          throw error;
        })
      )
  }

  updateResource(id: string, data: UT) {
    return this.httpClient.put(`${this.path()}/${id}`, data).pipe(
      catchError((error: Error) => {
        this.#openSnackBar(`Failed to update ${this.resourceName}. Please try again.`);
        throw error;
      })
    )
  }

  #updateState(partialState: Partial<DataServiceState<T>>): void {
    this.state.update((state) => ({
      ...state,
      ...partialState,
    }));
  }

  #openSnackBar(message: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
