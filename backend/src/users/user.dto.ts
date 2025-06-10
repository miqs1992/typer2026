export interface CreateUserDto {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
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