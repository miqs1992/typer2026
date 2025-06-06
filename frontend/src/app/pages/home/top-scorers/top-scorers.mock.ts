import { TopScorer } from './top-scorers.model';

export const topScorersMock: TopScorer[] = [
  {
    id: '05a8b018-6358-4804-acd8-f0e8b1073ea5',
    name: 'Robert Lewandowski',
    team: { name: 'Poland', flag: 'pl' },
    goals: 10,
    assists: 5
  },
  {
    id: 'b1c2d3e4-f5a6-7890-abcd-ef1234567890',
    name: 'Cristiano Ronaldo',
    team: { name: 'Portugal', flag: 'pt' },
    goals: 8,
    assists: 3
  },
  {
    id: 'c2d3e4f5-a6b7-8901-cdef-234567890123',
    name: 'Kylian Mbappé',
    team: { name: 'France', flag: 'fr' },
    goals: 5,
    assists: 4
  },
  {
    id: 'e4f5a6b7-c8d9-0123-ef45-678901234567',
    name: 'Harry Kane',
    team: { name: 'England', flag: 'gb' },
    goals: 3,
    assists: 1
  },
  {
    id: 'f5a6b7c8-d9e0-1234-5678-901234567890',
    name: 'Lionel Messi',
    team: { name: 'Argentina', flag: 'ar' },
    goals: 3,
    assists: 0,
  },
  {
    id: 'a6b7c8d9-e0f1-2345-6789-012345678901',
    name: 'Neymar Jr.',
    team: { name: 'Brazil', flag: 'br' },
    goals: 2,
    assists: 6
  }
];
