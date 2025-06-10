import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from './auth.controller';

@Global()
@Module({
  providers: [AuthService, UsersService],
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController]
})
export class AuthModule {}
