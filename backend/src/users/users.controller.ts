import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/auth.types';
import { RankingUserDto } from "./user.dto";

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  public async getCurrentUser(
    @Req() req: AuthenticatedRequest,
  ): Promise<Omit<User, 'encryptedPassword'>> {
    const user = await this.usersService.findOne(req.currentUserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { encryptedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
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
}
