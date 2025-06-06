import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignInResponse } from "./auth.types";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async signIn(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<SignInResponse> {
    return this.authService.signIn(email, password);
  }
}
