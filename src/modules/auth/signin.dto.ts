import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsDefined()
  public readonly email: string;

  @IsString()
  @IsDefined()
  public readonly password: string;
}
