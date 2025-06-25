import { Body, Controller, Get, NotFoundException, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthenticatedUser } from 'src/auth/auth.types';
import { RankingUserDto, UpdateMeDto } from "./user.dto";
import { ClerkAuthGuard } from "../auth/clerk-auth.guard";
import { CurrentUser } from "../decorators/current-user.decorator";

@UseGuards(ClerkAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  public async getCurrentUser(
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<User> {
    const user = await this.usersService.findOne(currentUser.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/ranking')
  public async getUsersRanking(
    @Query('limit') limit: number | undefined,
  ): Promise<{ items: RankingUserDto[]}> {
    const users = await this.usersService.findAll({ leagueRank: 'ASC' }, limit);

    return {
      items: users.map(user => ({
        id: user.id,
        username: user.firstName + ' ' + user.lastName,
        leagueRank: user.leagueRank,
        points: user.points,
        exactBetCount: user.exactBetCount,
        winner: user.winner ? {
          id: user.winner.id,
          name: user.winner.name,
          flag: user.winner.flag
        } : null,
        topScorer: user.topScorer ? {
          id: user.topScorer.id,
          name: user.topScorer.name,
          goals: user.topScorer.goals,
          assists: user.topScorer.assists,
          team: {
            id: user.topScorer.team.id,
            name: user.topScorer.team.name,
            flag: user.topScorer.team.flag
          }
        } : null
      }))
    }
  }

  @Patch('/me')
  public async updateCurrentUser(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() data: UpdateMeDto,
  ): Promise<User> {
    const user = await this.usersService.update(currentUser.id, data);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
