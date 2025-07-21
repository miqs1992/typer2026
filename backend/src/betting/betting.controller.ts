import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from "../auth/clerk-auth.guard";
import { FindMatchDayParams, NextMatchDayResponse, UpdateMatchDayBetsDto } from "./betting.dto";
import { BetService } from "./bet.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { AuthenticatedUser } from "../auth/auth.types";
import { Bet } from "./bet.entity";
import { MatchDaysService } from "../match-days/match-days.service";

@UseGuards(ClerkAuthGuard)
@Controller('betting')
export class BettingController {
  constructor(
    private readonly betService: BetService,
    private readonly matchDaysService: MatchDaysService,
  ) {}

  @Get('next')
  async getMyBetsForNextMatchDay(
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<NextMatchDayResponse> {
    const nextMatchDay = await this.matchDaysService.findNextMatchDay();

    if (!nextMatchDay) {
      return { matchDay: null, bets: [] };
    }

    const isBeforeStopBetTime = await this.betService.isBeforeStopBetTime(nextMatchDay.id);

    if (!isBeforeStopBetTime) {
      throw new UnprocessableEntityException('Betting is closed for this match day');
    }

    const bets = await this.betService.findOrCreateBets(currentUser.id, nextMatchDay.id);
    return {
      matchDay: {
        id: nextMatchDay.id,
        dayNumber: nextMatchDay.dayNumber,
        stopBetTime: nextMatchDay.stopBetTime,
        roundName: nextMatchDay.round.name,
      },
      bets: bets
    };
  }

  @Get('previous')
  async getMyBetsForPreviousMatchDay(
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<NextMatchDayResponse> {
    const previousMatchDay = await this.matchDaysService.findPreviousMatchDay();

    if (!previousMatchDay) {
      return { matchDay: null, bets: [] };
    }

    const isBeforeStopBetTime = await this.betService.isBeforeStopBetTime(previousMatchDay.id);

    if (isBeforeStopBetTime) {
      throw new UnprocessableEntityException('Betting is not closed for this match day');
    }

    const bets = await this.betService.findByUserAndMatchDay(currentUser.id, previousMatchDay.id);
    return {
      matchDay: {
        id: previousMatchDay.id,
        dayNumber: previousMatchDay.dayNumber,
        stopBetTime: previousMatchDay.stopBetTime,
        roundName: previousMatchDay.round.name,
      },
      bets: bets
    };
  }

  @Get(':matchDayId')
  async getMatchDayBets(
    @Param() { matchDayId }: FindMatchDayParams,
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<{ myBets: Bet[] }> {
    const matchDay = await this.matchDaysService.findOne(matchDayId);

    if (!matchDay) {
      throw new NotFoundException('Match day not found');
    }

    const isBeforeStopBetTime = await this.betService.isBeforeStopBetTime(matchDayId);

    if (isBeforeStopBetTime) {
      const myBets = await this.betService.findOrCreateBets(currentUser.id, matchDayId);

      return { myBets };
    } else {
      return { myBets: [] };
    }
  }

  @Post(':matchDayId')
  async betOnMatchDay(
    @Param() { matchDayId }: FindMatchDayParams,
    @Body() { bets }: UpdateMatchDayBetsDto,
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<void> {
    const matchDay = await this.matchDaysService.findOne(matchDayId);

    if (!matchDay) {
      throw new NotFoundException('Match day not found');
    }

    const isBeforeStopBetTime = await this.betService.isBeforeStopBetTime(matchDayId);

    if (!isBeforeStopBetTime) {
      throw new UnprocessableEntityException('Betting is closed for this match day');
    }

    if (!bets || bets.length === 0) {
      throw new UnprocessableEntityException('No bets provided');
    }

    await this.betService.updateBets(currentUser.id, matchDay.id, bets);
  }
}
