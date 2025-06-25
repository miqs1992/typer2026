import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { ClerkStrategy } from "./clerk.strategy";
import { ClerkClientProvider } from "../providers/clerk-client.provider";
import { PassportModule } from "@nestjs/passport";

@Global()
@Module({
  providers: [AuthService, UsersService, ClerkStrategy, ClerkClientProvider],
  imports: [PassportModule, forwardRef(() => UsersModule)],
  exports: [PassportModule],
})
export class AuthModule {}
