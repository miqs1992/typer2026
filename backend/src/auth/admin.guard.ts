import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly logger = new Logger(AdminGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.authService.verifyAuthToken(token);
      const isAdmin = await this.authService.isAdmin(payload.sub);

      if (!isAdmin) {
        throw new UnauthorizedException('User is not an admin');
      }
      request['currentUserId'] = payload.sub;
      request['isAdmin'] = isAdmin;

      this.logger.log('Token verified successfully for user:', payload.sub);
    } catch (error) {
      this.logger.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
