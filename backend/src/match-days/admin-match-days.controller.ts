import { AdminGuard } from "../auth/admin.guard";
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMatchDayDto, FindOneMatchDayParams, FindRoundParams } from "./match-days.dto";
import { MatchDay } from "./match-day.entity";
import { MatchDaysService } from "./match-days.service";
import { RoundsService } from "../rounds/rounds.service";

@UseGuards(AdminGuard)
@Controller('admin/rounds/:roundId/match-days')
export class AdminMatchDaysController {
  constructor(
    private readonly matchDaysService: MatchDaysService,
    private readonly roundsService: RoundsService,
  ) {}

  @Post('/')
  public async createMatchDay(
    @Param() { roundId }: FindRoundParams,
    @Body() data: CreateMatchDayDto,
  ): Promise<MatchDay> {
    return this.matchDaysService.create(roundId, data);
  }

  @Get('/')
  public async getAllMatchDays(
    @Param() { roundId }: FindRoundParams,
  ): Promise<{ items: MatchDay[] }> {
    await this.checkRoundExists(roundId);

    const matchDays = await this.matchDaysService.findAll({ round: { id: roundId } });
    return { items: matchDays };
  }

  @Get('/:matchDayId')
  public async getMatchDayById(
    @Param() { matchDayId, roundId }: FindOneMatchDayParams,
  ): Promise<MatchDay> {
    await this.checkRoundExists(roundId);

    return this.checkMatchDayExists(matchDayId);
  }

  @Delete('/:matchDayId')
  public async deleteMatchDay(
    @Param() { matchDayId, roundId }: FindOneMatchDayParams,
  ): Promise<void> {
    await this.checkRoundExists(roundId);
    await this.checkMatchDayExists(matchDayId);

    await this.matchDaysService.remove(matchDayId);
  }

  @Put('/:matchDayId')
  public async updateMatchDay(
    @Param() { matchDayId, roundId }: FindOneMatchDayParams,
    @Body() data: CreateMatchDayDto,
  ): Promise<MatchDay> {
    await this.checkRoundExists(roundId);
    await this.checkMatchDayExists(matchDayId);

    return this.matchDaysService.update(matchDayId, data);
  }

  private async checkMatchDayExists(id: string): Promise<MatchDay> {
    const matchDay = await this.matchDaysService.findOne(id);
    if (!matchDay) {
      throw new NotFoundException('Match day not found');
    }
    return matchDay;
  }

  private async checkRoundExists(id: string): Promise<void> {
    const round = await this.roundsService.findOne(id);
    if (!round) {
      throw new NotFoundException('Round not found');
    }
  }
}
