export interface PublicTeam {
  id: string;
  name: string;
  flag: string;
}

export interface PublicPlayer {
  id: string;
  name: string;
  goals: number;
  assists: number;
  team: PublicTeam;
}

export interface SelectorState<T extends ItemWithId> {
  items: T[];
  isLoading: boolean;
  error: string | null;
}

export interface ItemWithId {
  id: string;
}
