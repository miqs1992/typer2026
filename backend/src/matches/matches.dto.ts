import { IsDateString, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateMatchDto {
  @IsUUID()
  @IsNotEmpty()
  firstTeamId: string;

  @IsUUID()
  @IsNotEmpty()
  secondTeamId: string;

  @IsDateString()
  startsAt: Date;
}

export class UpdateMatchDto extends CreateMatchDto {
  @IsInt()
  @Min(0)
  firstTeamResult: number;

  @IsInt()
  @Min(0)
  secondTeamResult: number;
}

export class FindMatchDayParams {
  @IsUUID()
  matchDayId: string;
}

export class FindMatchParams extends FindMatchDayParams {
  @IsUUID()
  matchId: string;
}