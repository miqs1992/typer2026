import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.authService.verifyAuthToken(token);

      request['currentUserId'] = payload.sub;

      this.logger.log('Token verified successfully for user:', payload.sub);
    } catch (error) {
      this.logger.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
