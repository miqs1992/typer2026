import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateRoundDto } from "./rounds.dto";
import { Round } from "./round.entity";
import { RoundsService } from "./rounds.service";
import { AdminGuard } from "../auth/admin.guard";

@UseGuards(AdminGuard)
@Controller('admin/rounds')
export class AdminRoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post('/')
  public async createRound(
    @Body() data: CreateRoundDto,
  ): Promise<Round> {
    return this.roundsService.create(data);
  }

  @Get('/')
  public async getAllRounds(): Promise<{ items: Round[] }> {
    const rounds = await this.roundsService.findAll();
    return { items: rounds };
  }

  @Get('/:id')
  public async getRoundById(
    @Param('id') id: string,
  ): Promise<Round> {
    return this.checkRoundExists(id);
  }

  @Delete('/:id')
  public async deleteRound(
    @Param('id') id: string,
  ): Promise<void> {
    await this.checkRoundExists(id);

    await this.roundsService.remove(id);
  }

  @Put('/:id')
  public async updateRound(
    @Param('id') id: string,
    @Body() data: CreateRoundDto,
  ): Promise<Round> {
    await this.checkRoundExists(id);

    return this.roundsService.update(id, data);
  }

  private async checkRoundExists(id: string): Promise<Round> {
    const round = await this.roundsService.findOne(id);
    if (!round) {
      throw new NotFoundException('Round not found');
    }
    return round;
  }
}
