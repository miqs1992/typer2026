import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UsersController } from './users.controller';
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";

@Global()
@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
