export interface SignInResponse {
  access_token: string;
}

export interface JwtTokenPayload {
  sub: string;
}

export type AuthenticatedRequest = Request & { currentUserId: string };
export type AuthenticatedAdminRequest = AuthenticatedRequest & { isAdmin: boolean };

