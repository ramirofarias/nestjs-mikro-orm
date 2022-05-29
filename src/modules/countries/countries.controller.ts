import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RedisService } from '../../db/cache/redis.service';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountriesController {
  cacheManager: any;
  constructor(
    private redisService: RedisService,
    private readonly countriesService: CountriesService,
  ) {
    this.cacheManager = this.redisService.getCacheManager();
  }

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  async findAll() {
    if (this.cacheManager.store.getClient().connected) {
      return this.getOrSetCache('countries', () => {
        return this.countriesService.findAll();
      });
    } else {
      return this.countriesService.findAll();
    }
  }

  getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
      this.cacheManager.get(key, async (error, data) => {
        if (error) return reject(error);
        if (data !== null) return resolve(data);
        const freshData = await cb();
        this.cacheManager.set(key, freshData, { ttl: 60 });
        resolve(freshData);
      });
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
