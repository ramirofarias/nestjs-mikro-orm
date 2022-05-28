import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { isPublic } from '../../shared/decorators/is-public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@isPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(@Req() req: Request): { accessToken: string } {
    return this.authService.login(req.user as User);
  }
}
