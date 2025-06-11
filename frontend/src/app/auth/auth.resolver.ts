import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Profile } from './auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserResolver implements Resolve<Profile> {
  constructor(private service: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile>|Promise<Profile>|Profile {
    return this.service.loadCurrentUser();
  }
}
