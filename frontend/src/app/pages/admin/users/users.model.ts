export interface User {
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

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UpdateUserData extends Omit<CreateUserData, 'password' | 'passwordConfirmation'> {
  isAdmin: boolean;
  hasPaid: boolean;
  password?: string;
  passwordConfirmation?: string;
}
