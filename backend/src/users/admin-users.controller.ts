import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { AdminUserDto, CreateUserDto } from "./user.dto";
import { User } from "./user.entity";
import { AdminGuard } from "../auth/admin.guard";

@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  public async createUser(
    @Body() data: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(data);
  }

  @Get('/')
  public async getAllUsers(): Promise<{ users: AdminUserDto[] }> {
    const users = await this.usersService.findAll({ leagueRank: 'ASC' });

    return { users: users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      hasPaid: user.hasPaid,
      leagueRank: user.leagueRank,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })) };
  }
}
