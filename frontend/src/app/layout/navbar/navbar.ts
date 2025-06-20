import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Container } from '../container/container';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIcon, MatIconButton, Container, NgOptimizedImage, RouterLink, MatButton, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  #authService = inject(AuthService);
  #router = inject(Router);
  isLoggedIn = this.#authService.isLoggedIn;
  currentUser = this.#authService.loadedCurrentUser

  onLogout() {
    this.#authService.logout();
    this.#router.navigate(['login'], { replaceUrl: true });
  }
}
