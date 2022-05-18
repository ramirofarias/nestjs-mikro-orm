import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [MikroOrmModule.forFeature([Country])],
})
export class CountriesModule {}
