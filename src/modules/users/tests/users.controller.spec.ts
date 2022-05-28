import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuardMock } from '../../auth/__mocks__/JwtAuthGuardMock';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from '../__mocks__/user.stub';
jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideGuard(APP_GUARD)
      .useClass(JwtAuthGuardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Get user by id', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.findOne(userStub().id.toString());
    });

    it('should call the users service', async () => {
      expect(usersService.findOne).toHaveBeenCalledWith(
        userStub().id.toString(),
      );
    });

    it('should return the user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('Get all users', () => {
    let users: User[];
    beforeEach(async () => {
      users = await usersController.findAll();
    });

    it('should call the users service', async () => {
      expect(usersService.findAll).toHaveBeenCalled();
    });

    it('should return the users', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('Create user', () => {
    let user: User;
    let createUserDto: CreateUserDto;
    beforeEach(async () => {
      createUserDto = {
        email: userStub().email,
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        password: userStub().password,
      };
      user = await usersController.create(createUserDto);
    });

    it('should call the users service', async () => {
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should return the user', () => {
      expect(user).toEqual(userStub());
    });
  });
});
