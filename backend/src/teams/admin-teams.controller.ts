import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTeamDto, FindOneTeamParams, UpdateTeamDto } from "./teams.dto";
import { Team } from "./team.entity";
import { TeamsService } from "./teams.service";
import { ClerkAdminAuthGuard } from "../auth/clerk-admin-auth.guard";

@UseGuards(ClerkAdminAuthGuard)
@Controller('admin/teams')
export class AdminTeamsController {
  constructor(private readonly teamsService: TeamsService) {}

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

  @Delete('/:teamId')
  public async deleteTeam(
    @Param() { teamId }: FindOneTeamParams,
  ): Promise<void> {
    await this.checkTeamExists(teamId);

    await this.teamsService.remove(teamId);
  }

  @Get('/:teamId')
  public async getTeamById(
    @Param() { teamId }: FindOneTeamParams,
  ): Promise<Team> {
    return this.checkTeamExists(teamId);
  }

  @Put('/:teamId')
  public async updateTeam(
    @Param() { teamId }: FindOneTeamParams,
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
