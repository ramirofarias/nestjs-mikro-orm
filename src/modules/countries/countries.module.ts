import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RedisModule } from '../../db/cache/redis.module';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [MikroOrmModule.forFeature([Country]), RedisModule],
})
export class CountriesModule {}
