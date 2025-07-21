import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, LessThan, MoreThan, Repository } from "typeorm";
import { MatchDay } from "./match-day.entity";
import { CreateMatchDayDto } from "./match-days.dto";

@Injectable()
export class MatchDaysService {
  constructor(
    @InjectRepository(MatchDay)
    private matchDaysRepository: Repository<MatchDay>,
  ) {}

  findAll(whereClause?: FindOptionsWhere<MatchDay>): Promise<MatchDay[]> {
    return this.matchDaysRepository.find({
      where: whereClause,
      order: { dayNumber: 'DESC' }
    });
  }

  findOne(id: string): Promise<MatchDay | null> {
    return this.matchDaysRepository.findOneBy({ id });
  }

  async findNextMatchDay(): Promise<MatchDay | null> {
    const now = new Date();

    return this.matchDaysRepository.findOne({
      where: { stopBetTime: MoreThan(now) },
      order: { stopBetTime: 'ASC' },
    });
  }

  async findPreviousMatchDay(): Promise<MatchDay | null> {
    const now = new Date();

    return this.matchDaysRepository.findOne({
      where: { stopBetTime: LessThan(now) },
      order: { stopBetTime: 'DESC' },
    });
  }

  async findFirstMatchDay(): Promise<MatchDay | null> {
    const result = await this.matchDaysRepository.find({
      order: { stopBetTime: 'ASC' },
      take: 1,
    })

    return result.length > 0 ? result[0] : null;
  }

  async remove(id: string): Promise<void> {
    await this.matchDaysRepository.delete(id);
  }

  async create(roundId: string, matchDayData: CreateMatchDayDto): Promise<MatchDay> {
    const matchDay = this.matchDaysRepository.create({
      ...matchDayData,
      round: { id: roundId },
    });
    return this.matchDaysRepository.save(matchDay);
  }

  async update(id: string, matchDayData: CreateMatchDayDto): Promise<MatchDay> {
    const matchDay = await this.findOne(id);
    if (!matchDay) {
      throw new NotFoundException('MatchDay not found');
    }

    return this.matchDaysRepository.save({ ...matchDay, ...matchDayData });
  }
}
