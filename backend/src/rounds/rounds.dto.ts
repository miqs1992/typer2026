import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { RoundStage } from "./rounds.type";

export class CreateRoundDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  scoreFactor: number;

  @IsEnum(RoundStage)
  stage: string;
}

export class FindOneRoundParams {
  @IsUUID()
  id: string;
}

