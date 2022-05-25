import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';
import { CustomBaseEntity } from '../../../shared/entities/base.entity';
import { Country } from '../../countries/entities/country.entity';
import { Role } from '../../roles/entities/role.entity';

@SoftDeletable(() => User, 'deletedAt', () => new Date())
@Entity()
export class User extends CustomBaseEntity {
  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  address: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles = new Collection<Role>(this);

  @ManyToOne({
    nullable: true,
    entity: () => Country,
  })
  country?: Country;

  @Property({ nullable: true })
  deletedAt?: Date;
}
