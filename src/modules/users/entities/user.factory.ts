import { Factory, Faker } from '@mikro-orm/seeder';
import { hashPassword } from '../../auth/utils/bcrypt';
import { User } from './user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      email: faker.internet.email(),
      password: hashPassword('password'),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
    };
  }
}
