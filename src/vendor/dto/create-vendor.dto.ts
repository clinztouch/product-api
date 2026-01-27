import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;
}
