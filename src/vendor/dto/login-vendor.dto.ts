import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
