import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
