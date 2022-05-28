import { NotFoundError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailJobsEnum } from '../../mail/mail-job.types';
import { MailService } from '../../mail/mail.service';
import { UsersService } from '../users/users.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordReset } from './password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: EntityRepository<PasswordReset>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async findByEmail(email: string) {
    return this.passwordResetRepository.findOne({ email });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return;
    }
    await this.checkPreviousAttempts(email);
    await this.createNewAttempt(email);
  }

  private async checkPreviousAttempts(email: string) {
    const previousAttempt = await this.passwordResetRepository.findOne({
      email,
    });

    if (previousAttempt) {
      this.passwordResetRepository.removeAndFlush(previousAttempt);
    }
  }

  private async createNewAttempt(email: string) {
    const token = crypto.randomBytes(20).toString('hex');
    const newResetAttempt = this.passwordResetRepository.create({
      email,
      token,
    });

    await this.passwordResetRepository.persistAndFlush(newResetAttempt);
    this.sendPasswordResetEmail(email, token);
  }

  private async sendPasswordResetEmail(email: string, token: string) {
    const url = `http://localhost:3000/forgot-password/${token}`;

    await this.mailService.enqueueMail(MailJobsEnum.PasswordReset, {
      email: email,
      url: url,
    });
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetAttempt = await this.passwordResetRepository.findOne({
      token: resetPasswordDto.token,
    });
    if (!resetAttempt || resetAttempt.expiresAt < new Date()) {
      throw new NotFoundError('Invalid token');
    }

    const user = await this.usersService.resetPassword(
      resetAttempt.email,
      resetPasswordDto.password,
    );

    this.passwordResetRepository.removeAndFlush(resetAttempt);

    return user;
  }
}
