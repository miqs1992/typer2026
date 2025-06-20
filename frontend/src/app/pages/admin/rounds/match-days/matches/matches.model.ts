import { MatchDay } from '../match-days.model';

export interface Match {
  id: string;
  firstTeam: {
    id: string;
    name: string;
    flag: string;
  };
  secondTeam: {
    id: string;
    name: string;
    flag: string;
  };
  firstTeamResult: number;
  secondTeamResult: number;
  startsAt: Date;
  matchDay: MatchDay;
}

export interface CreateMatchDto {
  firstTeamId: string;
  secondTeamId: string;
  startsAt: Date;
}

export interface UpdateMatchDto extends CreateMatchDto {
  firstTeamResult: number;
  secondTeamResult: number;
}
