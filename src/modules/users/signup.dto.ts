import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  @IsDefined()
  public readonly email: string;

  @IsString()
  @IsDefined()
  public readonly password: string;

  @IsString()
  @IsDefined()
  public readonly firstName: string;

  @IsString()
  @IsDefined()
  public readonly lastName: string;
}
