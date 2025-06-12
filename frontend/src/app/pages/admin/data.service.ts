import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs';
import { DataServiceState } from './data.model';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T, CT, UT> {
  protected abstract path: Signal<string>;
  protected httpClient = inject(HttpClient);

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
    return this.httpClient.post(this.path(), data)
  }

  deleteResource(id: string) {
    return this.httpClient.delete(`${this.path()}/${id}`)
  }

  getResource(id: string) {
    return this.httpClient.get<T>(`${this.path()}/${id}`)
  }

  updateResource(id: string, data: UT) {
    return this.httpClient.put(`${this.path()}/${id}`, data)
  }

  #updateState(partialState: Partial<DataServiceState<T>>): void {
    this.state.update((state) => ({
      ...state,
      ...partialState,
    }));
  }
}
