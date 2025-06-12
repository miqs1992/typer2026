import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/admin.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerDto, UpdatePlayerDto } from "./teams.dto";
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
    @Param('teamId') teamId: string,
    @Body() data: Omit<CreatePlayerDto, 'teamId'>,
  ) {
    await this.checkTeamExists(teamId);

    return this.playersService.create({ ...data, teamId });
  }

  @Get('/')
  public async getPlayersByTeamId(
    @Param('teamId') teamId: string,
  ): Promise<{ items: Player[] }> {
    await this.checkTeamExists(teamId);

    const players = await this.playersService.findByTeamId(teamId);
    return { items: players };
  }

  @Delete('/:id')
  public async deletePlayer(
    @Param('teamId') teamId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.checkTeamExists(teamId);

    await this.checkPlayerExists(id)

    await this.playersService.remove(id);
  }

  @Put('/:id')
  public async updatePlayer(
    @Param('teamId') teamId: string,
    @Param('id') id: string,
    @Body() data: UpdatePlayerDto,
  ): Promise<Player> {
    await this.checkTeamExists(teamId);
    await this.checkPlayerExists(id);

    return this.playersService.update(id, { ...data, teamId });
  }

  @Get('/:id')
  public async getPlayerById(
    @Param('teamId') teamId: string,
    @Param('id') id: string,
  ): Promise<Player> {
    await this.checkTeamExists(teamId);
    return this.checkPlayerExists(id);
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

