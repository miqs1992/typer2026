import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from "./team.entity";
import { CreateTeamDto } from "./teams.dto";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamsRepository.find();
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
}
