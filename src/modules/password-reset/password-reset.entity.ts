import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../../shared/entities/base.entity';

@Entity({ tableName: 'password_resets' })
export class PasswordReset extends CustomBaseEntity {
  @Property()
  email!: string;

  @Property()
  token!: string;

  //expires one week after creation
  @Property()
  expiresAt: Date = new Date(Date.now() + 604800000);
}
