import { IsDefined, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString()
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
