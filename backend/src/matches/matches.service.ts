import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { Match } from "./match.entity";
import { CreateMatchDto, UpdateMatchDto } from "./matches.dto";

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
  ) {}

  findAll(
    whereClause?: FindOptionsWhere<Match>,
    order: FindOptionsOrder<Match> = { startsAt: 'DESC' }
  ): Promise<Match[]> {
    return this.matchesRepository.find({
      where: whereClause,
      order
    });
  }

  findOne(id: string): Promise<Match | null> {
    return this.matchesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.matchesRepository.delete(id);
  }

  async create(matchDayId: string, matchData: CreateMatchDto): Promise<Match> {
    const match = this.matchesRepository.create({
      startsAt: matchData.startsAt,
      matchDay: { id: matchDayId },
      firstTeam: { id: matchData.firstTeamId },
      secondTeam: { id: matchData.secondTeamId },
    });

    return this.matchesRepository.save(match);
  }

  async update(id: string, matchData: UpdateMatchDto): Promise<Match> {
    const match = await this.findOne(id);
    if (!match) {
      throw new NotFoundException('Match not found');
    }

    const updatedMatch = this.matchesRepository.create({
      ...match,
      firstTeamResult: matchData.firstTeamResult,
      secondTeamResult: matchData.secondTeamResult,
      startsAt: matchData.startsAt,
      firstTeam: { id: matchData.firstTeamId },
      secondTeam: { id: matchData.secondTeamId },
    });

    return this.matchesRepository.save(updatedMatch);
  }
}
