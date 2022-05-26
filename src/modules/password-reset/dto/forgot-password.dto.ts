import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  email: string;
}
