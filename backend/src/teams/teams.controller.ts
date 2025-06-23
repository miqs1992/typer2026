import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { PublicPlayerDto, PublicTeamDto } from "./teams.dto";
import { TeamsService } from "./teams.service";
import { ILike } from "typeorm";
import { AuthGuard } from "../auth/auth.guard";
import { PlayersService } from "./players.service";

@UseGuards(AuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}

  @Get('/')
  public async searchTeams(
    @Query('search') search: string | undefined,
  ): Promise<{ items: PublicTeamDto[] }> {
    const teams = await this.teamsService.findAll(search ? { name: ILike(`%${search}%`) } : undefined, 5);

    return {
      items: teams.map(team => ({
        id: team.id,
        name: team.name,
        flag: team.flag,
      }))
    };
  }

  @Get('/scorers-ranking')
  public async getTeamsRanking(
    @Query('limit') limit: number | undefined,
  ): Promise<{ items: PublicPlayerDto[] }> {
    const players = await this.playersService.findAll(undefined, limit);

    return {
      items: players.map(player => ({
        id: player.id,
        name: player.name,
        goals: player.goals,
        assists: player.assists,
        team: {
          id: player.team.id,
          name: player.team.name,
          flag: player.team.flag,
        },
      }))
    };
  }

  @Get('/players')
  public async searchPlayers(
    @Query('search') search: string | undefined,
  ): Promise<{ items: PublicPlayerDto[] }> {
    const players = await this.playersService.findAll(
      search ? { name: ILike(`%${search}%`) } : undefined,
      5,
      { name: 'ASC' }
    );

    return {
      items: players.map(player => ({
        id: player.id,
        name: player.name,
        goals: player.goals,
        assists: player.assists,
        team: {
          id: player.team.id,
          name: player.team.name,
          flag: player.team.flag,
        },
      }))
    };
  }

  @Get('/:id')
  public async getTeamById(@Param('id') id: string): Promise<PublicTeamDto> {
    const team = await this.teamsService.findOne(id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return {
      id: team.id,
      name: team.name,
      flag: team.flag,
    };
  }
}
