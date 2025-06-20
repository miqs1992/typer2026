import { Controller, Get, UseGuards } from '@nestjs/common';
import { PublicMatchDay } from "./match-days.dto";
import { MatchDaysService } from "./match-days.service";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('match-days')
export class MatchDaysController {
  constructor(
    private readonly matchDaysService: MatchDaysService,
  ) {}

  @Get('next')
  public async getMatchDayById(): Promise<PublicMatchDay | null> {
    const day = await this.matchDaysService.findNextMatchDay();

    if (!day) {
      return null;
    }

    return {
      id: day.id,
      roundId: day.round.id,
      dayNumber: day.dayNumber,
      stopBetTime: day.stopBetTime,
    };
  }
}
