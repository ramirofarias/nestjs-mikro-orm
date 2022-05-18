import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../modules/roles/entities/role.entity';

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const adminRole = em.create(Role, { name: 'Administrador' });

    const userRole = em.create(Role, { name: 'Usuario' });
  }
}
