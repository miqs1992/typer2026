import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoundDto } from "./rounds.dto";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post('/')
  public async createRound(
    @Body() data: CreateRoundDto,
  ): Promise<Round> {
    return this.roundsService.create(data);
  }
}
