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

export interface UserServiceState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
