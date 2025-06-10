import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreatePlayerDto, CreateTeamDto } from "./teams.dto";
import { Team } from "./team.entity";
import { TeamsService } from "./teams.service";
import { PlayersService } from "./players.service";
import { AdminGuard } from "../auth/admin.guard";

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}

  @UseGuards(AdminGuard)
  @Post('/')
  public async createTeam(
    @Body() data: CreateTeamDto,
  ): Promise<Team> {
    return this.teamsService.create(data);
  }

  @UseGuards(AdminGuard)
  @Post('/:teamId/players')
  public async createPlayer(
    @Param('teamId') teamId: string,
    @Body() data: Omit<CreatePlayerDto, 'teamId'>,
  ) {
    return this.playersService.create({ ...data, teamId });
  }
}
