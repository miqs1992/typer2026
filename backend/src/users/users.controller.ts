import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/auth.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
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
}
