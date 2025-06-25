import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { PublicMatchDay } from "./match-days.dto";
import { MatchDaysService } from "./match-days.service";
import { ClerkAuthGuard } from "../auth/clerk-auth.guard";

@UseGuards(ClerkAuthGuard)
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

  @Get('first')
  public async getFirstMatchDay(): Promise<PublicMatchDay & { isBeforeFirstGame?: boolean }> {
    const day = await this.matchDaysService.findFirstMatchDay();

    if (!day) {
      throw new NotFoundException('No match days found');
    }

    return {
      id: day.id,
      roundId: day.round.id,
      dayNumber: day.dayNumber,
      stopBetTime: day.stopBetTime,
      isBeforeFirstGame: day.stopBetTime > new Date(),
    };
  }
}
