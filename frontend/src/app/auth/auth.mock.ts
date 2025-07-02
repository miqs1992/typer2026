import { Profile } from './auth.model';

export const currentUserMock: Profile = {
  id: '4f960c83-fd28-4583-894a-93cc71c3389d',
  email: 'merrilee_goldbergfo@trick.cu',
  firstName: 'Merrilee',
  lastName: 'Goldberg',
  isAdmin: false,
  points: 10,
  leagueRank: 3,
  exactBetCount: 2,
  hasPaid: true,
  winner: { name: 'France', id: 'a2641513-d016-4aca-bd4f-736781fcc0f9', flag: 'fr' },
  topScorer: {
    name: 'Player Y',
    id: '69a33001-3662-4db2-84dd-2907fe1e1269',
    team: { name: 'Germany', flag: 'de' }
  }
}
