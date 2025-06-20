import { Module } from '@nestjs/common';
import { MatchDaysService } from './match-days.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchDay } from "./match-day.entity";
import { AdminMatchDaysController } from './admin-match-days.controller';
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { RoundsModule } from "../rounds/rounds.module";
import { RoundsService } from "../rounds/rounds.service";

@Module({
  imports: [TypeOrmModule.forFeature([MatchDay]), RoundsModule],
  providers: [MatchDaysService, AuthService, UsersService, RoundsService],
  controllers: [AdminMatchDaysController],
  exports: [MatchDaysService, TypeOrmModule],
})
export class MatchDaysModule {}
