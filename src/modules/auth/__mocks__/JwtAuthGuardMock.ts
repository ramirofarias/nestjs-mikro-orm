import { ExecutionContext } from '@nestjs/common';

export class JwtAuthGuardMock {
  canActivate(context: ExecutionContext) {
    return true;
  }
}
