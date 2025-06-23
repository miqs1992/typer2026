
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateMeDto, UpdateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';
import { Team } from "../teams/team.entity";
import { Player } from "../teams/player.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(
    order: FindOptionsOrder<User> = { leagueRank: 'ASC' },
    limit?: number,
  ): Promise<User[]> {
    return this.usersRepository.find({ order, take: limit });
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create({ password, passwordConfirmation, ...rest }: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.validateAndEncryptPassword(password, passwordConfirmation);
    const user = this.usersRepository.create({
      ...rest,
      encryptedPassword,
    });
    return this.usersRepository.save(user);
  }

  async update(id: string, { password, passwordConfirmation, ...rest } : UpdateUserDto | UpdateMeDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = this.usersRepository.create({
      ...user,
      ...rest,
    })
    if (password && passwordConfirmation) {
      updatedUser.encryptedPassword = await this.validateAndEncryptPassword(password, passwordConfirmation);
    }

    if (rest['winnerId']) {
      updatedUser.winner = { id: rest['winnerId'] } as Team;
    }

    if (rest['topScorerId']) {
      updatedUser.topScorer = { id: rest['topScorerId'] } as Player;
    }

    return this.usersRepository.save(updatedUser);
  }

  private async validateAndEncryptPassword(password: string, passwordConfirmation: string): Promise<string> {
    if(password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (password !== passwordConfirmation) {
      throw new Error('Password and password confirmation do not match');
    }

    return bcrypt.hash(password, 10);
  }
}
