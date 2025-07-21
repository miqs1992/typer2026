export interface BettingMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  roundName: string;
}
interface Team {
  id: string;
  name: string;
  flag: string;
}

interface Match {
  id: string;
  firstTeam: Team;
  secondTeam: Team;
  firstTeamResult: number | null;
  secondTeamResult: number | null;
}

export interface Bet {
  id: string;
  firstTeamResult: number;
  secondTeamResult: number;
  hasBonus: boolean;
  match: Match;
  points: number;
  isExact: boolean;
}

export interface NextMatchDayResponse {
  matchDay: BettingMatchDay | null;
  bets: Bet[];
}

export type UpdateBet = Pick<Bet, 'id' | 'firstTeamResult' | 'secondTeamResult' | 'hasBonus'>;
