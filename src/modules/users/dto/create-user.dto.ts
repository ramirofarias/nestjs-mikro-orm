import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Debe ingresar un email válido',
    },
  )
  email: string;
  @IsString()
  @Length(8, 64, {
    message: 'Debe ingresar una contraseña de entre 8 y 64 caracteres',
  })
  password: string;
  @IsString()
  @IsNotEmpty({
    message: 'Debe ingresar un nombre',
  })
  firstName: string;
  @IsOptional()
  lastName: string;
}
