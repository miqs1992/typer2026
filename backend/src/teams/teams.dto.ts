export interface CreatePlayerDto {
  name: string;
  teamId: string;
}

export interface CreateTeamDto {
  name: string;
  flag: string;
}

export interface UpdateTeamDto extends CreateTeamDto {
  winner: boolean;
}

