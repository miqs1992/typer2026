import { RankedUserData } from './ranking.model';

export const rankingDataMock: RankedUserData[] = [
  {
    id: 'f1ff2548-b0cc-4b0e-aac0-9b1767730dcb',
    username: 'Terah Norfleet',
    points: 38.5,
    exactBetCount: 5,
    winner: { name: 'France', flag: 'fr' },
    leagueRank: 1,
    topScorer: { name: 'Robercik', team: { name: 'Poland', flag: 'pl' } }
  },
  {
    id: '37f7a219-470d-4ad1-9183-dcde4a4ab220',
    username: 'Ebone Tutor',
    points: 36,
    exactBetCount: 4,
    winner: { name: 'Germany', flag: 'de' },
    leagueRank: 2,
    topScorer: { name: 'Ziomek', team: { name: 'Spain', flag: 'es' } }
  },
  {
    id: '688b8d8f-0e9e-4c29-acbf-9e74be79690b',
    username: 'Peggi Borton',
    points: 34.6,
    exactBetCount: 3,
    winner: { name: 'Italy', flag: 'it' },
    leagueRank: 3,
    topScorer: { name: 'Taavon Reyes', team: { name: 'England', flag: 'gb-eng' } }
  },
  {
    id: '1f294724-d82e-488b-96f5-176053f7ffd7',
    username: 'Mona Murtha',
    points: 34.5,
    exactBetCount: 3,
    winner: { name: 'Italy', flag: 'it' },
    leagueRank: 3,
    topScorer: { name: 'Taavon Reyes', team: { name: 'England', flag: 'gb-eng' } }
  },
  {
    id: '8a57d9ca-b35c-41bc-bb19-13c9afca55f7',
    username: 'Madelynn Storch',
    points: 29.3,
    exactBetCount: 1,
    winner: { name: 'Italy', flag: 'it' },
    leagueRank: 3,
    topScorer: { name: 'Taavon Reyes', team: { name: 'England', flag: 'gb-eng' } }
  },
  {
    id: '5b9eee06-147e-443a-ae3e-a6d67099afc9',
    username: 'Micholas Booze',
    points: 28.1,
    exactBetCount: 2,
    winner: { name: 'Poland', flag: 'pl' },
    leagueRank: 3,
    topScorer: { name: 'Taavon Reyes', team: { name: 'England', flag: 'gb-eng' } }
  },
];
