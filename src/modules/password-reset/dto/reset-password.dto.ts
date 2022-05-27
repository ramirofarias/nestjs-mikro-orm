import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../../shared/decorators/match.decorator';

export class ResetPasswordDto {
  @IsString()
  @Length(8, 64, {
    message: 'Debe ingresar una contraseña de entre 8 y 64 caracteres',
  })
  password: string;

  @IsString()
  @Match('password', {
    message: 'Las contraseñas deben coincidir',
  })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
