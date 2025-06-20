import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PublicTeam, PublicTeamsState } from '../public-team.model';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, Subject } from 'rxjs';
import { NgOptionComponent, NgSelectComponent, } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FlagIcon } from '../../flag-icon/flag-icon';

type HttpGetParamsOptions = NonNullable<Parameters<HttpClient['get']>[1]>['params'];

@Component({
  selector: 'app-team-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    FlagIcon,
  ],
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss'],
})
export class TeamSelectorComponent implements OnInit {
  #httpClient = inject(HttpClient);
  #destroyRef = inject(DestroyRef);

  readonly #state = signal<PublicTeamsState>({
    teams: [],
    isLoading: false,
    error: null,
  });

  readonly isLoading = computed(() => this.#state().isLoading);
  readonly error = computed(() => this.#state().error);
  readonly teams = computed(() => this.#state().teams);

  #searchSubject = new Subject<string>();

  placeholder = input<string>('Search teams...');
  control = input.required<FormControl<string | null>>();

  ngOnInit(): void {
    const subscription = this.#searchSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.loadTeams({ search: term });
    });

    // Initial load
    this.loadTeams();

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  loadTeams(searchParams?: HttpGetParamsOptions): void {
    this.#updateState({ isLoading: true, error: null });

    this.#httpClient
      .get<{items: PublicTeam[]}>('teams', {
        params: searchParams,
      })
      .pipe(
        map((data) => {
          this.#updateState({ teams: data.items, isLoading: false });
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

  searchTeams(event: { term: string }): void {
    this.#searchSubject.next(event.term);
  }

  onClear(): void {
    this.searchTeams({ term: '' });
  }

  #updateState(partialState: Partial<PublicTeamsState>): void {
    this.#state.update((state) => ({
      ...state,
      ...partialState,
    }));
  }
}


