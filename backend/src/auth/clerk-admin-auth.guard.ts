import { type ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClerkAuthGuard } from "./clerk-auth.guard";
import { AuthService } from "./auth.service";

@Injectable()
export class ClerkAdminAuthGuard extends ClerkAuthGuard {
  constructor(
    _reflector: Reflector,
    private readonly authService: AuthService
  ) {
    super(_reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      return false;
    }

    // Get the request from the context
    const request = context.switchToHttp().getRequest();

    // Access the user object set by the Clerk Strategy
    // The user is typically attached to the request object after authentication
    console.log(request);

    const user = request.user;

    if (!user || !user.sub) {
      return false;
    }

    // Check if the user is an admin
    return this.authService.isAdmin(user.sub);
  }
}