import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { Team } from "./team.entity";
import { CreateTeamDto, UpdateTeamDto } from "./teams.dto";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll(
    whereClause?: FindOptionsWhere<Team>,
    limit?: number,
    order: FindOptionsOrder<Team> = { name: 'ASC' }
  ): Promise<Team[]> {
    return this.teamsRepository.find({
      where: whereClause,
      order,
      take: limit,
    });
  }

  findOne(id: string): Promise<Team | null> {
    return this.teamsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.teamsRepository.delete(id);
  }

  async create(teamData: CreateTeamDto): Promise<Team> {
    const team = this.teamsRepository.create(teamData);
    return this.teamsRepository.save(team);
  }

  async update(id: string, teamData: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);
    if (!team) {
      throw new Error('Team not found');
    }

    return this.teamsRepository.save({ ...team, ...teamData });
  }
}
