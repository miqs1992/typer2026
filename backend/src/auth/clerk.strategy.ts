import { ClerkClient, verifyToken } from '@clerk/backend';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { UsersService } from "../users/users.service";
import { AuthenticatedUser } from "./auth.types";

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService,
    protected readonly usersService: UsersService,
  ) {
    super();
  }

  async validate(req: Request): Promise<AuthenticatedUser> {
    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.configService.get('CLERK_SECRET_KEY'),
      });

      const clerkUser = await this.clerkClient.users.getUser(tokenPayload.sub);

      let dbUser = await this.usersService.findByClerkId(clerkUser.id);

      if (!dbUser) {
        dbUser = await this.usersService.create({
          clerkId: clerkUser.id,
          firstName: clerkUser.firstName!,
          lastName: clerkUser.lastName!,
          email: clerkUser.emailAddresses[0]!.emailAddress,
        })
      }

      return {
        id: dbUser.id,
        clerkId: clerkUser.id,
        email: dbUser.email,
        hasPaid: dbUser.hasPaid,
        isAdmin: dbUser.isAdmin
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}