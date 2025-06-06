export interface TopScorer {
  id: string;
  name: string;
  team: { name: string; flag: string };
  goals: number;
  assists: number;
}
