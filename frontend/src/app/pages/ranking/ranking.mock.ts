import { RankedUserData } from './ranking.model';

export const mockRanking: RankedUserData[] = [
  {
    id: '71028155-5709-4364-8300-55a1e4cb3f3b',
    username: 'user1',
    points: 10,
    exactBetCount: 3,
    winner: null,
    leagueRank: 1,
    topScorer: null
  },
  {
    id: '71028155-5709-4364-8300-55a1e4cb3f3c',
    username: 'user2',
    points: 8,
    exactBetCount: 2,
    winner: {
      name: 'Poland',
      flag: 'pl'
    },
    leagueRank: 2,
    topScorer: {
      name: 'Player X',
      team: {
        name: 'Germany',
        flag: 'de'
      }
    }
  }
];
