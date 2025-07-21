import { IsUUID, IsInt, Min, IsBoolean, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Bet } from "./bet.entity";

export class UpdateBetDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  firstTeamResult: number;

  @IsInt()
  @Min(0)
  secondTeamResult: number;

  @IsBoolean()
  hasBonus: boolean;
}

export class UpdateMatchDayBetsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBetDto)
  bets: UpdateBetDto[];
}

export class FindMatchDayParams {
  @IsUUID()
  matchDayId: string;
}

export interface NextMatchDayResponse {
  matchDay: {
    id: string;
    dayNumber: number;
    stopBetTime: Date;
    roundName: string;
  } | null;
  bets: Bet[]
}
