import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../modules/roles/entities/role.entity';
import { RoleFactory } from '../../modules/roles/entities/role.factory';
import { UserFactory } from '../../modules/users/entities/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const [adminRole, userRole] = await this.generateRoles(em);

    const [adminUser, regularUsers] = await this.generateUsers(
      em,
      adminRole,
      userRole,
    );
  }

  async generateRoles(em: EntityManager): Promise<Role[]> {
    const adminRole = new RoleFactory(em).makeOne({ name: 'Administrador' });
    const userRole = new RoleFactory(em).makeOne({ name: 'Usuario' });
    return [adminRole, userRole];
  }

  async generateUsers(
    em: EntityManager,
    adminRole: Role,
    userRole: Role,
  ): Promise<any> {
    const adminUser = new UserFactory(em).makeOne().roles.set([adminRole]);
    const regularUsers = new UserFactory(em)
      .each((user) => {
        user.roles.set([userRole]);
      })
      .make(15);
    return [adminUser, regularUsers];
  }
}
