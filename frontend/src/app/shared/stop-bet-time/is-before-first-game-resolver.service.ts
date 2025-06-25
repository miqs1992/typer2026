import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { StopBetTimeService } from './stop-bet-time.service';

@Injectable({ providedIn: 'root' })
export class IsBeforeFirstGameResolver implements Resolve<boolean> {
  constructor(private service: StopBetTimeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.service.getIsBeforeFirstGame();
  }
}
