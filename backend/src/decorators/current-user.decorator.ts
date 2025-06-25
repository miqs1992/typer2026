import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from "../auth/auth.types";

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as AuthenticatedUser;
  },
);