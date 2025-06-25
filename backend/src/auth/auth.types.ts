export interface AuthenticatedUser {
  id: string;
  email: string;
  isAdmin: boolean;
  hasPaid: boolean;
  clerkId: string;
}
