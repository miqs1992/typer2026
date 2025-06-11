export interface Team {
  id: string;
  name: string;
  flag: string;
  winner: boolean;
}

export interface CreateTeamData extends Omit<Team, 'id' | 'winner'> {}

export interface UpdateTeamData extends Omit<Team, 'id'> {}
