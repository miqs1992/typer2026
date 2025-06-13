import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";
import { AdminRoundsController } from "./admin-rounds.controller";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Round])],
  controllers: [AdminRoundsController],
  providers: [RoundsService, AuthService, UsersService],
})
export class RoundsModule {}
