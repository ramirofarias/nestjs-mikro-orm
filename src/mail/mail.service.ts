import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/modules/users/entities/user.entity';
import { MailJob } from './mail-job.types';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mailsend') private mailQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  async enqueueMail(job: MailJob, data?: any) {
    await this.mailQueue.add(job, data);
  }

  async sendUserConfirmationEmail(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Nest test" <nest@test.com>', // override default from
      subject: 'Confirmá tu mail',
      template: 'confirmation',
      context: {
        url,
      },
    });
  }

  async sendPasswordResetEmail(email: string, url: string) {
    this.mailerService.sendMail({
      to: email,
      from: '"Nest test" <nest@test.com>', // override default from
      subject: 'Reset password',
      template: 'password-reset',
      context: {
        url,
      },
    });
  }
}
