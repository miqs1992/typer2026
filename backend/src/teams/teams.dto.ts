import { IsBoolean, IsNotEmpty, IsString, IsUUID, Length, IsInt, Min } from "class-validator";
import { Team } from "./team.entity";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 6)
  flag: string;
}

export class UpdateTeamDto extends CreateTeamDto {
  @IsBoolean()
  winner: boolean;
}

export class UpdatePlayerDto extends CreatePlayerDto {
  @IsInt()
  @Min(0)
  goals: number;

  @IsInt()
  @Min(0)
  assists: number;

  @IsBoolean()
  king: boolean;
}

export class FindOneTeamParams {
  @IsUUID()
  teamId: string;
}

export class FindOnePlayerParams extends FindOneTeamParams {
  @IsUUID()
  playerId: string;
}

export type PublicTeamDto = Pick<Team, 'name' | 'flag' | 'id'>;
