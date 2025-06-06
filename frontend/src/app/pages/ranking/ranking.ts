import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { RankingService } from './ranking.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { FlagIcon } from '../../shared/flag-icon/flag-icon';
import { Profile } from '../../auth/auth.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking',
  imports: [
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    FlagIcon,
  ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking implements OnInit {
  #rankingService = inject(RankingService);
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);

  currentUser = signal<Profile | null>(null);
  ranking = this.#rankingService.loadedRanking;
  isFetching = signal(false)
  error = signal<string | null>(null);

  isCompact = input(false);
  displayedColumns = computed(() => ['rank', 'name', 'points', 'exact', ...(this.isCompact() ? [] : ['topScorer', 'winner'])]) ;

  ngOnInit() {
    this.isFetching.set(true);
    this.error.set('');
    const sub = this.#rankingService.loadFullRanking()
      .subscribe({
        complete: () => {
          this.isFetching.set(false);
        },
        error: (err: Error) => {
          this.isFetching.set(false);
          this.error.set(err.message);
        }
      });

    const userSub = this.#activatedRoute.data.subscribe(data => {
      if (data['currentUser']) {
        this.currentUser.set(data['currentUser']);
      } else {
        this.currentUser.set(null);
      }
    })

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
      userSub.unsubscribe();
    })
  }
}
