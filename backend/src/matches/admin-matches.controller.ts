import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMatchDto, FindMatchDayParams, FindMatchParams, UpdateMatchDto } from "./matches.dto";
import { Match } from "./match.entity";
import { MatchesService } from "./matches.service";
import { MatchDaysService } from "../match-days/match-days.service";
import { ClerkAdminAuthGuard } from "../auth/clerk-admin-auth.guard";

@UseGuards(ClerkAdminAuthGuard)
@Controller('admin/match-days/:matchDayId/matches')
export class AdminMatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchDaysService: MatchDaysService,
  ) {}

  @Post('/')
  public async createMatch(
    @Param() { matchDayId }: FindMatchDayParams,
    @Body() data: CreateMatchDto,
  ): Promise<Match> {
    await this.checkMatchDayExists(matchDayId);
    return this.matchesService.create(matchDayId, data);
  }

  @Get('/')
  public async getAllMatches(
    @Param() { matchDayId }: FindMatchDayParams,
  ): Promise<{ items: Match[] }> {
    await this.checkMatchDayExists(matchDayId);
    const matches = await this.matchesService.findAll({ matchDay: { id: matchDayId } });
    return { items: matches };
  }

  @Get('/:matchId')
  public async getMatchById(
    @Param() { matchId, matchDayId }: FindMatchParams,
  ): Promise<Match> {
    await this.checkMatchDayExists(matchDayId);
    return this.checkMatchExists(matchId);
  }

  @Delete('/:matchId')
  public async deleteMatch(
    @Param() { matchId, matchDayId }: FindMatchParams,
  ): Promise<void> {
    await this.checkMatchDayExists(matchDayId);
    await this.checkMatchExists(matchId);
    await this.matchesService.remove(matchId);
  }

  @Put('/:matchId')
  public async updateMatch(
    @Param() { matchId, matchDayId }: FindMatchParams,
    @Body() data: UpdateMatchDto,
  ): Promise<Match> {
    await this.checkMatchDayExists(matchDayId);
    await this.checkMatchExists(matchId);
    return this.matchesService.update(matchId, data);
  }

  private async checkMatchExists(id: string): Promise<Match> {
    const match = await this.matchesService.findOne(id);
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  private async checkMatchDayExists(id: string): Promise<void> {
    const matchDay = await this.matchDaysService.findOne(id);
    if (!matchDay) {
      throw new NotFoundException('Match day not found');
    }
  }
}
