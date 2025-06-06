export interface TeamData {
  name: string;
  flag: string;
}

interface TopScorerData {
  name: string;
  team: TeamData;
}

export interface ShortRankedUserData {
  id: string;
  username: string;
  points: number;
  exactBetCount: number;
}

export interface RankedUserData extends ShortRankedUserData {
  winner: TeamData;
  leagueRank: number;
  topScorer: TopScorerData;
}
