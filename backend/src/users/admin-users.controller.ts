import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { AdminUserDto, CreateUserDto, UpdateUserDto } from "./user.dto";
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
  public async getAllUsers(): Promise<{ items: AdminUserDto[] }> {
    const users = await this.usersService.findAll({ leagueRank: 'ASC' });

    return { items: users.map(this.mapUserToAdminDto) };
  }

  @Get('/:id')
  public async getUserById(
    @Param('id') id: string,
  ): Promise<AdminUserDto> {
    const user = await this.checkUserExists(id);

    return this.mapUserToAdminDto(user);
  }

  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<AdminUserDto> {
    await this.checkUserExists(id);

    const updatedUser = await this.usersService.update(id, data);
    return this.mapUserToAdminDto(updatedUser);
  }

  @Delete('/:id')
  public async deleteUser(
    @Param('id') id: string,
  ): Promise<void> {
    await this.checkUserExists(id);

    await this.usersService.remove(id);
  }

  private mapUserToAdminDto(user: User): AdminUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      hasPaid: user.hasPaid,
      leagueRank: user.leagueRank,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async checkUserExists(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
