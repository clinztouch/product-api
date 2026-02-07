import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUser {
  vendorId: string;
  email: string;
}

export const CurrentVendor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
