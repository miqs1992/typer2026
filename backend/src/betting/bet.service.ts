import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { Bet } from "./bet.entity";
import { MatchDaysService } from "../match-days/match-days.service";
import { MatchesService } from "../matches/matches.service";
import { UpdateBetDto } from "./betting.dto";

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private readonly betsRepository: Repository<Bet>,
    private readonly matchDaysService: MatchDaysService,
    private readonly matchesService: MatchesService,
    private readonly dataSource: DataSource,
  ) {}

  findAll(whereClause?: FindOptionsWhere<Bet>): Promise<Bet[]> {
    return this.betsRepository.find({
      where: whereClause,
      order: { createdAt: 'DESC' }
    });
  }

  findOne(id: string): Promise<Bet | null> {
    return this.betsRepository.findOneBy({ id });
  }

  findByUserAndMatchDay(userId: string, matchDayId: string): Promise<Bet[]> {
    return this.betsRepository.find({
      where: {
        match: { matchDay: { id: matchDayId } },
        user: { id: userId }
      }
    });
  }

  async findOrCreateBets(userId: string, matchDayId: string): Promise<Bet[]> {
    const matches = await this.matchesService.findAll({ matchDay: { id: matchDayId } });
    const existingBets = await this.findByUserAndMatchDay(userId, matchDayId);

    const promises = matches.map(async match => {
      let bet = existingBets.find(b => b.match.id === match.id);

      if (bet) {
        return bet;
      } else {
        bet = this.betsRepository.create({
          match,
          user: { id: userId },
        });
        bet = await this.betsRepository.save(bet, { reload: true });
        return bet;
      }
    })

    return Promise.all(promises);
  }

  async isBeforeStopBetTime(matchDayId: string): Promise<boolean> {
    const matchDay = await this.matchDaysService.findOne(matchDayId);
    if (!matchDay) {
      throw new NotFoundException('Match day not found');
    }
    return matchDay.stopBetTime > new Date();
  }

  async remove(id: string): Promise<void> {
    await this.betsRepository.delete(id);
  }

  async updateBets(userId: string, matchDayId: string, betsData: UpdateBetDto[]): Promise<void> {
    const bets = await this.findByUserAndMatchDay(userId, matchDayId);

    await this.dataSource.transaction(async (transaction) => {
      const entitiesToUpdate = betsData.map((betData) => {
        const bet = bets.find(b => b.id === betData.id);
        return this.betsRepository.create({ ...bet, ...betData })
      });

      await transaction.getRepository(Bet).save(entitiesToUpdate);
    })
  }
}
