import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from "./player.entity";
import { CreatePlayerDto } from "./teams.dto";

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  findOne(id: string): Promise<Player | null> {
    return this.playersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.delete(id);
  }

  async create(playerData: CreatePlayerDto): Promise<Player> {
    const player = this.playersRepository.create(playerData);
    return this.playersRepository.save(player);
  }
}
