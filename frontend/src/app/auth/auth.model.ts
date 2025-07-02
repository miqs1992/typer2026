export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  hasPaid: boolean;
  winner: { name: string; id: string; flag: string } | null;
  topScorer: {
    name: string;
    id: string;
    team: { name: string; flag: string };
  } | null;
}
