import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterCompanyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  companyName: string;
}