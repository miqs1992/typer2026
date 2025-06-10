import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtTokenPayload, SignInResponse } from "./auth.types";
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload: JwtTokenPayload = {
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      })
    };
  }

  public async verifyAuthToken(token: string): Promise<JwtTokenPayload> {
    return this.jwtService.verifyAsync<JwtTokenPayload>(token);
  }

  public async isAdmin(userId: string): Promise<boolean> {
    const user = await this.usersService.findOne(userId);
    return user?.isAdmin ?? false;
  }

  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
