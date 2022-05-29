import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  getCacheManager() {
    return this.cacheManager;
  }
}
