import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { PublicTeam } from '../selector.model';
import { FlagIcon } from '../../flag-icon/flag-icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-team-label',
  imports: [
    FlagIcon
  ],
  templateUrl: './team-label.html',
  styleUrl: './team-label.scss'
})
export class TeamLabel implements OnInit {
  team = input.required<PublicTeam>();
  forceShowName = input<boolean>(false);

  #destroyRef = inject(DestroyRef);
  breakpointObserver = inject(BreakpointObserver);
  isMobile = signal(false);

  ngOnInit() {
    const sub = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
