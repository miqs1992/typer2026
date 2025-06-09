import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lazy-load the service to avoid circular dependency
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();

    if (token()) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token()}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
