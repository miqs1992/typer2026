import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from "./user.entity";
import { PublicPlayerDto, PublicTeamDto } from "../teams/teams.dto";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  clerkId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['clerkId'] as const)
) {
  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  hasPaid: boolean;
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

export class UpdateMeDto {
  @IsUUID()
  @IsOptional()
  winnerId?: string;

  @IsUUID()
  @IsOptional()
  topScorerId?: string;
}

