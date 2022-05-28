import { User } from '../entities/user.entity';

export const userStub = (): Partial<User> => ({
  id: 1,
  email: 'email@test.com',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  address: 'address',
  country: null,
  deletedAt: null,
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  updatedAt: new Date('2022-01-01T00:00:00.000Z'),
});
