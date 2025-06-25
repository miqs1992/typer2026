
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateMeDto, UpdateUserDto } from "./user.dto";
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

  findByClerkId(clerkId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ clerkId });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: string, data : UpdateUserDto | UpdateMeDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = this.usersRepository.create({
      ...user,
      ...data,
    })

    if (data['winnerId']) {
      updatedUser.winner = { id: data['winnerId'] } as Team;
    }

    if (data['topScorerId']) {
      updatedUser.topScorer = { id: data['topScorerId'] } as Player;
    }

    return this.usersRepository.save(updatedUser);
  }
}
