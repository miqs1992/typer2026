export enum RoundStage {
  GROUP = 'GROUP',
  KNOCKOUT = 'KNOCKOUT',
}

export const RoundStageLabels: Record<RoundStage, string> = {
  [RoundStage.GROUP]: 'Group Stage',
  [RoundStage.KNOCKOUT]: 'Knockout Stage',
}

export interface Round {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoundDto {
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
}
