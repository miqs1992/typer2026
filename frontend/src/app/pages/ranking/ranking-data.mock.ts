import { RankedUserData } from './ranking.model';

export const rankingDataMock: RankedUserData[] = [
  {
    id: '1',
    username: 'Terah Norfleet',
    points: 1500,
    exactBetCount: 5,
    winner: { name: 'France', flag: 'fr' },
    leagueRank: 1,
    topScorer: { name: 'Robercik', team: { name: 'Poland', flag: 'pl' } }
  },
  {
    id: '2',
    username: 'Ebone Tutor',
    points: 1400,
    exactBetCount: 4,
    winner: { name: 'Germany', flag: 'de' },
    leagueRank: 2,
    topScorer: { name: 'Ziomek', team: { name: 'Spain', flag: 'es' } }
  },
  {
    id: '3',
    username: 'Peggi Borton',
    points: 1300,
    exactBetCount: 3,
    winner: { name: 'Italy', flag: 'it' },
    leagueRank: 3,
    topScorer: { name: 'Taavon Reyes', team: { name: 'England', flag: 'gb-eng' } }
  }
];
