import { Module } from '@nestjs/common';
import { RoundsController } from './rounds.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";

@Module({
  imports: [TypeOrmModule.forFeature([Round])],
  controllers: [RoundsController],
  providers: [RoundsService],
})
export class RoundsModule {}
