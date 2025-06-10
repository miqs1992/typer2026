import { Module } from '@nestjs/common';
import { MatchDaysService } from './match-days.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchDay } from "./match-day.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MatchDay])],
  providers: [MatchDaysService]
})
export class MatchDaysModule {}
