export interface PublicTeam {
  id: string;
  name: string;
  flag: string;
}

export interface PublicTeamsState {
  teams: PublicTeam[];
  isLoading: boolean;
  error: string | null;
}
