import { type ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClerkAuthGuard } from "./clerk-auth.guard";
import { AuthService } from "./auth.service";
import { AuthenticatedUser } from "./auth.types";

@Injectable()
export class ClerkAdminAuthGuard extends ClerkAuthGuard {
  private readonly logger = new Logger(ClerkAdminAuthGuard.name);

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

    const user = request.user as AuthenticatedUser | undefined;

    if (!user || !user.id) {
      this.logger.error('User not found in request object');
      return false;
    }

    // Check if the user is an admin
    return this.authService.isAdmin(user.id);
  }
}