import { Body, Controller, Post, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetService } from './password-reset.service';

@Throttle(1, 60)
@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post()
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.passwordResetService.forgotPassword(forgotPasswordDto.email);
    return res.status(200).send({
      message: 'Email enviado',
    });
  }
}
