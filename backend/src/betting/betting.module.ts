import { Module } from '@nestjs/common';
import { BettingController } from './betting.controller';
import { BetService } from "./bet.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bet } from "./bet.entity";
import { MatchDaysService } from "../match-days/match-days.service";
import { MatchDaysModule } from "../match-days/match-days.module";
import { MatchesModule } from "../matches/matches.module";
import { MatchesService } from "../matches/matches.service";

@Module({
  imports: [TypeOrmModule.forFeature([Bet]), MatchDaysModule, MatchesModule],
  controllers: [BettingController],
  providers: [BetService, MatchDaysService, MatchesService],
})
export class BettingModule {}
