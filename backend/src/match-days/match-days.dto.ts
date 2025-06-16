import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateMatchDayDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  dayNumber: number;

  @IsDateString()
  stopBetTime: Date;
}

export class FindRoundParams {
  @IsUUID()
  roundId: string;
}

export class FindOneMatchDayParams extends FindRoundParams {
  @IsUUID()
  matchDayId: string;
}

