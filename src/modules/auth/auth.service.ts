import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { User } from '../users/entities/user.entity';
import LoginDto from './dto/login.dto';
import { inputMatchesEncryption } from './utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public signUp(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  public login(user: User): { accessToken: string } {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async validateUser(request: LoginDto) {
    const user = await this.usersService.findByEmail(request.email);
    if (user && inputMatchesEncryption(request.password, user.password)) {
      return user;
    } else throw new UnauthorizedException('Credenciales incorrectas');
  }
}
