import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Container } from '../container/container';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { StopBetTimeService } from '../../shared/stop-bet-time/stop-bet-time.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIcon, MatIconButton, Container, NgOptimizedImage, RouterLink, MatButton, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  #destroyRef = inject(DestroyRef);
  #authService = inject(AuthService);
  #stopBetTimeService = inject(StopBetTimeService);

  isBeforeFirstGame = signal<boolean>(false);
  currentUser = this.#authService.loadedCurrentUser;

  ngOnInit() {
    const subscription = this.#stopBetTimeService.getIsBeforeFirstGame().subscribe(data => {
      this.isBeforeFirstGame.set(data);
    })

    this.#destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }


  onLogout() {
    this.#authService.logout();
  }

  login() {
    this.#authService.redirectToLogin();
  }
}
