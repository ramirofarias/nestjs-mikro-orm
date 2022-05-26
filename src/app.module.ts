import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CountriesModule } from './modules/countries/countries.module';
import { PasswordResetModule } from './modules/password-reset/password-reset.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    ThrottlerModule.forRoot({
      limit: 1000,
      ttl: 60,
    }),
    MailModule,
    UsersModule,
    AuthModule,
    SharedModule,
    RolesModule,
    CountriesModule,
    PasswordResetModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
