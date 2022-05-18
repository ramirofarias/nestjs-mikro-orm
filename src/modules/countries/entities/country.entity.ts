import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../../../shared/entities/base.entity';

@Entity()
export class Country extends CustomBaseEntity {
  @Property()
  name: string;
  @Property()
  code: string;
  @Property()
  phoneCode: number;
}
