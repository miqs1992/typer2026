import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { filter, firstValueFrom, take } from 'rxjs';
import { SpinnerService } from '../shared/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  #authService = inject(AuthService);
  #spinner = inject(SpinnerService);


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    console.info('[AuthGuard] Waiting for AuthService to init.');
    this.#spinner.show();

    await firstValueFrom(
      this.#authService.isLoading$.pipe(
        filter(loading => !loading),
        take(1)
      )
    );

    if (this.#authService.loadedCurrentUser()) {
      console.info('[AuthGuard] User is authenticated, access granted.');
      this.#spinner.hide();
      return true;
    }

    console.info('[AuthGuard] User not found. Redirecting to login.');
    this.#authService.redirectToLogin();
    return false;
  }
}
