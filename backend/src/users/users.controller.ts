import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  public async createUser(
    @Body() data: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(data);
  }
}
