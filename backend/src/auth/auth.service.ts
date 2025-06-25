import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async isAdmin(userId: string): Promise<boolean> {
    const user = await this.usersService.findOne(userId);
    return user?.isAdmin ?? false;
  }
}
