import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { isPublic } from '../../shared/decorators/is-public.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NotFoundInterceptor } from './interceptors/password-errors.interceptor';
import { PasswordResetService } from './password-reset.service';

@isPublic()
@UseInterceptors(NotFoundInterceptor)
@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post('/forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.passwordResetService.forgotPassword(forgotPasswordDto.email);
    return res.status(200).send({
      message: 'Email enviado',
    });
  }

  @Post()
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(resetPasswordDto);
  }
}
