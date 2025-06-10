
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from "./round.entity";
import { CreateRoundDto } from "./rounds.dto";

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private roundsRepository: Repository<Round>,
  ) {}

  findAll(): Promise<Round[]> {
    return this.roundsRepository.find({ order: { order: 'DESC' } });
  }

  findOne(id: string): Promise<Round | null> {
    return this.roundsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.roundsRepository.delete(id);
  }

  async create(roundData: CreateRoundDto): Promise<Round> {
    const round = this.roundsRepository.create(roundData);
    return this.roundsRepository.save(round);
  }
}
