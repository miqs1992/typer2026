import { Module } from '@nestjs/common';
import { AdminMatchesController } from './admin-matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./match.entity";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { MatchDaysModule } from "../match-days/match-days.module";
import { MatchDaysService } from "../match-days/match-days.service";

@Module({
  imports: [TypeOrmModule.forFeature([Match]), MatchDaysModule],
  controllers: [AdminMatchesController],
  providers: [MatchesService, AuthService, UsersService, MatchDaysService]
})
export class MatchesModule {}
