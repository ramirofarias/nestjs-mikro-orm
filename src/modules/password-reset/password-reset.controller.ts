import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetService } from './password-reset.service';

// @Throttle(1, 60)
@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordResetService.forgotPassword(forgotPasswordDto.email);
  }
}
