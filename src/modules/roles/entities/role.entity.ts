import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role extends CustomBaseEntity {
  @Property()
  name: string;

  @ManyToMany(() => User, 'roles', { owner: true })
  users = new Collection<User>(this);
}
