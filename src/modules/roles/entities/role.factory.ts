import { Factory } from '@mikro-orm/seeder';
import { Role } from './role.entity';

export class RoleFactory extends Factory<Role> {
  model = Role;

  definition(): Partial<Role> {
    return {
      name: 'Administrador',
    };
  }
}
