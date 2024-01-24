import { IsEmail, IsString } from 'class-validator';

export class SignInBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
