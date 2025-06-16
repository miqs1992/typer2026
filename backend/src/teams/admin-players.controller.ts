import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/admin.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerDto, FindOnePlayerParams, FindOneTeamParams, UpdatePlayerDto } from "./teams.dto";
import { Team } from "./team.entity";
import { TeamsService } from "./teams.service";
import { Player } from "./player.entity";

@UseGuards(AdminGuard)
@Controller('admin/teams/:teamId/players')
export class AdminPlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
  ) {}

  @Post('/')
  public async createPlayer(
    @Param() { teamId }: FindOneTeamParams,
    @Body() data: CreatePlayerDto,
  ) {
    await this.checkTeamExists(teamId);

    return this.playersService.create(teamId, data);
  }

  @Get('/')
  public async getPlayersByTeamId(
    @Param() { teamId }: FindOneTeamParams,
  ): Promise<{ items: Player[] }> {
    await this.checkTeamExists(teamId);

    const players = await this.playersService.findByTeamId(teamId);
    return { items: players };
  }

  @Delete('/:playerId')
  public async deletePlayer(
    @Param() { teamId, playerId }: FindOnePlayerParams,
  ): Promise<void> {
    await this.checkTeamExists(teamId);
    await this.checkPlayerExists(playerId)

    await this.playersService.remove(playerId);
  }

  @Put('/:playerId')
  public async updatePlayer(
    @Param() { teamId, playerId }: FindOnePlayerParams,
    @Body() data: UpdatePlayerDto,
  ): Promise<Player> {
    await this.checkTeamExists(teamId);
    await this.checkPlayerExists(playerId);

    return this.playersService.update(playerId, data);
  }

  @Get('/:playerId')
  public async getPlayerById(
    @Param() { teamId, playerId }: FindOnePlayerParams,
  ): Promise<Player> {
    await this.checkTeamExists(teamId);
    return this.checkPlayerExists(playerId);
  }

  private async checkTeamExists(id: string): Promise<Team> {
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  private async checkPlayerExists(id: string): Promise<Player> {
    const player = await this.playersService.findOne(id);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }
}

