export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  winner: { name: string; id: string; flag: string } | null;
  topScorer: {
    name: string;
    id: string;
    team: { name: string; flag: string };
  } | null;
}

export interface SignInResponse {
  access_token: string;
}
