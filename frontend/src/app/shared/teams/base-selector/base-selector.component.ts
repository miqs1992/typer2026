import { computed, DestroyRef, Directive, inject, input, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ItemWithId, SelectorState } from '../selector.model';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, Subject, tap } from 'rxjs';

type HttpGetParamsOptions = NonNullable<Parameters<HttpClient['get']>[1]>['params'];

@Directive()
export abstract class BaseSelectorComponent<T extends ItemWithId> implements OnInit {
  #httpClient = inject(HttpClient);
  #destroyRef = inject(DestroyRef);

  abstract readonly searchPath: string;

  readonly #state = signal<SelectorState<T>>({
    items: [],
    isLoading: false,
    error: null,
  });

  readonly isLoading = computed(() => this.#state().isLoading);
  readonly error = computed(() => this.#state().error);
  readonly items = computed(() => this.#state().items);

  #searchSubject = new Subject<string>();
  control = input.required<FormControl<string | null>>();
  placeholder = input<string>('Search...');

  ngOnInit(): void {
    const searchSubscription = this.#searchSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.loadResources({ search: term });
    });

    const valueSubscription = this.control().valueChanges.pipe(
      tap(value => {
        if (value) {
          if (!this.items().some(item => item.id === value)) {
            this.loadItemById(value);
          }
        }
      })
    ).subscribe();

    this.loadResources();

    this.#destroyRef.onDestroy(() => {
      searchSubscription.unsubscribe();
      valueSubscription.unsubscribe();
    });
  }

  loadItemById(itemId: string): void {
    this.#httpClient
      .get<T>(`${this.searchPath}/${itemId}`)
      .pipe(
        tap(item => {
          this.#state.update(state => {
            if (!state.items.some(t => t.id === item.id)) {
              return {
                ...state,
                items: [...state.items, item]
              };
            }
            return state;
          });
        }),
        catchError(error => {
          console.error('Error loading item by ID:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  loadResources(searchParams?: HttpGetParamsOptions): void {
    this.#updateState({ isLoading: true, error: null });

    this.#httpClient
      .get<{items: T[]}>(this.searchPath, {
        params: searchParams,
      })
      .pipe(
        map((data) => {
          this.#updateState({ items: data.items, isLoading: false });
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

  searchItems(event: { term: string }): void {
    this.#searchSubject.next(event.term);
  }

  onClear(): void {
    this.searchItems({ term: '' });
  }

  #updateState(partialState: Partial<SelectorState<T>>): void {
    this.#state.update((state) => ({
      ...state,
      ...partialState,
    }));
  }
}
