import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { PublicTeamDto } from "./teams.dto";
import { TeamsService } from "./teams.service";
import { ILike } from "typeorm";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

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
