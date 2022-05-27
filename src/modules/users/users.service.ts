import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { hash } from '../auth/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = hash(createUserDto.password);
    const user = this.userRepository.create({ password, ...createUserDto });
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async findAll() {
    return this.userRepository.findAll({
      fields: [
        'id',
        'firstName',
        'lastName',
        'email',
        'country',
        'roles',
        { country: ['name'], roles: ['name'] },
      ],
    });
  }

  async paginate(query: any) {
    const pageSize = query?.pageSize ?? 10;
    const page = query?.page ?? 1;
    const offset = (page - 1) * pageSize;
    const [users, count] = await this.userRepository.findAndCount(
      {},
      { limit: pageSize, offset: offset, orderBy: { firstName: 'DESC' } },
    );
    return {
      data: users,
      total: count,
      lastPage: Math.ceil(count / pageSize),
    };
  }

  async findOne(id: any) {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
