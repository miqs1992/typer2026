import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePlayerDto, CreateTeamDto, UpdateTeamDto } from "./teams.dto";
import { Team } from "./team.entity";
import { TeamsService } from "./teams.service";
import { PlayersService } from "./players.service";
import { AdminGuard } from "../auth/admin.guard";

@UseGuards(AdminGuard)
@Controller('admin/teams')
export class AdminTeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}

  @Get('/')
  public async getAllTeams(): Promise<{ items: Team[] }> {
    const teams = await this.teamsService.findAll();
    return { items: teams} ;
  }

  @Post('/')
  public async createTeam(
    @Body() data: CreateTeamDto,
  ): Promise<Team> {
    return this.teamsService.create(data);
  }

  @Post('/:teamId/players')
  public async createPlayer(
    @Param('teamId') teamId: string,
    @Body() data: Omit<CreatePlayerDto, 'teamId'>,
  ) {
    return this.playersService.create({ ...data, teamId });
  }

  @Delete('/:teamId')
  public async deleteTeam(
    @Param('teamId') teamId: string,
  ): Promise<void> {
    await this.checkTeamExists(teamId);

    await this.teamsService.remove(teamId);
  }

  @Get('/:teamId')
  public async getTeamById(
    @Param('teamId') teamId: string,
  ): Promise<Team> {
    return this.checkTeamExists(teamId);
  }

  @Put('/:teamId')
  public async updateTeam(
    @Param('teamId') teamId: string,
    @Body() data: UpdateTeamDto,
  ): Promise<Team> {
    await this.checkTeamExists(teamId);

    return this.teamsService.update(teamId, data);
  }

  private async checkTeamExists(id: string): Promise<Team> {
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }
}
