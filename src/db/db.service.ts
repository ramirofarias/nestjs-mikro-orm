import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  getEm(): EntityManager {
    return this.em;
  }

  getORM(): MikroORM {
    return this.orm;
  }
}
