import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { hash } from '../../modules/auth/utils/bcrypt';
import { Country } from '../../modules/countries/entities/country.entity';
import { CountryFactory } from '../../modules/countries/entities/country.factory';
import { Role } from '../../modules/roles/entities/role.entity';
import { RoleFactory } from '../../modules/roles/entities/role.factory';
import { UserFactory } from '../../modules/users/entities/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const countries = new CountryFactory(em).createAll();

    const [adminRole, userRole] = await this.generateRoles(em);
    const [adminUser, regularUsers] = await this.generateUsers(
      em,
      adminRole,
      userRole,
      countries[0],
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
    country: Country,
  ): Promise<any> {
    const adminUser = new UserFactory(em)
      .makeOne({
        country: country,
        email: 'admin@test.com',
        password: hash('password'),
      })
      .roles.set([adminRole]);
    const regularUsers = new UserFactory(em)
      .each((user) => {
        user.roles.set([userRole]);
      })
      .make(15, { country: country });
    return [adminUser, regularUsers];
  }
}
