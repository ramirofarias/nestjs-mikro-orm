import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

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
}
