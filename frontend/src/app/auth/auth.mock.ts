import { Profile } from './auth.model';

export const currentUserMock: Profile = {
  id: '688b8d8f-0e9e-4c29-acbf-9e74be79690b',
  firstName: 'Peggi',
  lastName: 'Borton',
  email: 'carmin_mellorc@neural.bos',
  isAdmin: false,
  points: 34.5,
  exactBetCount: 3,
  leagueRank: 3,
  topScorer: {
    name: 'Taavon Reyes',
    id: 'd7383f45-78ef-4315-be80-0c8b661b2973',
    team: { name: 'England', flag: 'gb-eng' }
  },
  winner: {
    name: 'Italy',
    id: 'f1ff2548-b0cc-4b0e-aac0-9b1767730dcb',
    flag: 'it'
  }
}
