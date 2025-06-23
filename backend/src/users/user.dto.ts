import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { User } from "./user.entity";
import { PublicPlayerDto, PublicTeamDto } from "../teams/teams.dto";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @Length(8)
  passwordConfirmation: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'passwordConfirmation'] as const)
) {
  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  hasPaid: boolean;

  @IsString()
  @IsOptional()
  @Length(8)
  password?: string;

  @IsString()
  @IsOptional()
  @Length(8)
  passwordConfirmation?: string;
}

export interface AdminUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  hasPaid: boolean;
  leagueRank: number;
  createdAt: Date;
  updatedAt: Date;
}

export class FindOneUserParams {
  @IsUUID()
  id: string;
}

export type RankingUserDto = Pick<User, 'id' | 'points' | 'exactBetCount' | 'leagueRank'> & {
  username: string;
  winner: PublicTeamDto | null;
  topScorer: PublicPlayerDto | null;
};