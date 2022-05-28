import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
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
    MikroOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          dbName:
            configService.get<string>('NODE_ENV') === 'test'
              ? 'mikro_orm_test'
              : configService.get<string>('DB_NAME'),
          allowGlobalContext:
            configService.get<string>('NODE_ENV') === 'test' ? true : false,
        };
      },
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      limit: 1000,
      ttl: 60,
    }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get('MAIL_QUEUE_HOST'),
          port: config.get('MAIL_QUEUE_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
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
    { provide: APP_GUARD, useExisting: JwtAuthGuard },
    JwtAuthGuard,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
