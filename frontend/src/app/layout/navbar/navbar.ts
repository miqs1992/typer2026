import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Container } from '../container/container';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIcon, MatIconButton, Container, NgOptimizedImage, RouterLink, MatButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  #authService = inject(Auth);
  #router = inject(Router);
  isLoggedIn = this.#authService.isLoggedIn;

  onLogout() {
    this.#authService.logout();
    this.#router.navigate(['login'], { replaceUrl: true });
  }
}
