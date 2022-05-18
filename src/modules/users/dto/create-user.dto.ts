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
  @Length(8, undefined, {
    message: 'Debe ingresar una contraseña de al menos 8 caracteres',
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
