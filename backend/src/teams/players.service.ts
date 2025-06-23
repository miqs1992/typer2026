import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Player } from "./player.entity";
import { CreatePlayerDto, UpdatePlayerDto } from "./teams.dto";

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  findAll(
    whereClause?: FindOneOptions<Player>['where'],
    limit?: number,
    order: FindOneOptions<Player>['order'] = { goals: 'DESC', assists: 'DESC' }
  ): Promise<Player[]> {
    return this.playersRepository.find({
      where: whereClause,
      order,
      take: limit,
    });
  }

  findByTeamId(teamId: string): Promise<Player[]> {
    return this.playersRepository.find({
      where: { team: { id: teamId } },
      order: { goals: 'DESC', assists: 'DESC' }
    });
  }

  findOne(id: string): Promise<Player | null> {
    return this.playersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.delete(id);
  }

  async create(teamId: string, data: CreatePlayerDto): Promise<Player> {
    const player = this.playersRepository.create({
      ...data,
      team: { id: teamId }
    });
    return this.playersRepository.save(player);
  }

  async update(id: string, playerData: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);
    if (!player) {
      throw new Error('Player not found');
    }

    return this.playersRepository.save({ ...player, ...playerData });
  }
}
