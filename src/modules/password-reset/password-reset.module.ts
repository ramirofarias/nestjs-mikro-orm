import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MailModule } from '../../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { PasswordResetController } from './password-reset.controller';
import { PasswordReset } from './password-reset.entity';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([PasswordReset]),
    UsersModule,
    MailModule,
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
