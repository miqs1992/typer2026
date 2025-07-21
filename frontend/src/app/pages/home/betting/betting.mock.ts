import { NextMatchDayResponse } from './betting.model';

const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

export const mockedNextMatchDay: NextMatchDayResponse = {
  matchDay: {
    id: '123',
    dayNumber: 1,
    stopBetTime: nextMonth,
    roundName: 'Group stage 1'
  },
  bets: [{
    id: 'bet1',
    firstTeamResult: 2,
    secondTeamResult: 1,
    hasBonus: true,
    match: {
      id: 'match1',
      firstTeam: {
        id: 'team1',
        name: 'Team A',
        flag: 'flag-a.png'
      },
      secondTeam: {
        id: 'team2',
        name: 'Team B',
        flag: 'flag-b.png'
      },
      firstTeamResult: 2,
      secondTeamResult: 1
    },
    points: 3,
    isExact: true
  }],
}
