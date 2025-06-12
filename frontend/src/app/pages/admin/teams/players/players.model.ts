export interface Player {
  id: string;
  name: string;
  goals: number;
  assists: number;
  king: boolean;
  team: {
    id: string;
    name: string;
    flag: string;
    winner: boolean;
  }
}

export interface CreatePlayerData {
  name: string;
}

export interface UpdatePlayerData extends CreatePlayerData {
  goals: number;
  assists: number;
  king: boolean;
}
