import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../../db/cache/redis.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  cacheManager: any;
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: EntityRepository<Country>,
    private redisService: RedisService,
  ) {
    this.cacheManager = this.redisService.getCacheManager();
  }
  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  findAll() {
    return this.getCachedCountries();
  }

  async getCachedCountries() {
    if (this.cacheManager.store.getClient().connected) {
      const countries = await this.cacheManager.get('countries');
      if (!countries) {
        const countries = await this.countryRepository.findAll();
        this.cacheManager.set('countries', countries);
        return countries;
      }
      return countries;
    }
    return this.countryRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
