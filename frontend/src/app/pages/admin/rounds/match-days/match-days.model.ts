import { Round } from '../rounds.model';

export interface MatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  createdAt: Date;
  updatedAt: Date;
  round: Round;
}

export interface CreateMatchDayDto {
  dayNumber: number;
  stopBetTime: Date;
}
