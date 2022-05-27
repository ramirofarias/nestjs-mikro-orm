import { NotFoundError, ValidationError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailJobsEnum } from '../../mail/mail-job.types';
import { MailService } from '../../mail/mail.service';
import { hash } from '../auth/utils/bcrypt';
import { UsersService } from '../users/users.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordReset } from './password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: EntityRepository<PasswordReset>,
    private usersService: UsersService,
    private mailerService: MailerService,
    private mailService: MailService,
  ) {}

  async findByEmail(email: string) {
    const resetAttempt = await this.passwordResetRepository.findOne({ email });
    return resetAttempt;
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
      this.passwordResetRepository.remove(previousAttempt);
    }
  }

  private async createNewAttempt(email: string) {
    const token = crypto.randomBytes(20).toString('hex');
    const newResetAttempt = this.passwordResetRepository.create({
      email,
      token,
    });

    await this.passwordResetRepository.persistAndFlush(newResetAttempt);
    await this.sendPasswordResetEmail(email, token);
  }

  private async sendPasswordResetEmail(email: string, token: string) {
    const url = `http://localhost:3000/forgot-password/${token}`;

    this.mailService.enqueueMail(MailJobsEnum.PasswordReset, {
      email: email,
      url: url,
    });
  }

  private async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetAttempt = await this.passwordResetRepository.findOne({
      token: resetPasswordDto.token,
    });
    if (!resetAttempt) {
      throw new NotFoundError('Invalid token');
    }
    if (resetAttempt.expiresAt < new Date()) {
      this.passwordResetRepository.remove(resetAttempt);
      throw new ValidationError('Invalid token');
    }

    const user = await this.usersService.findByEmail(resetAttempt.email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.password = hash(resetPasswordDto.password);
    this.usersService.update(user.id, user);
    this.passwordResetRepository.remove(resetAttempt);
    return user;
  }
}
