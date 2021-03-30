import { IsDefined, IsString } from 'class-validator';

export class SigninRequestDto {
  @IsString()
  @IsDefined()
  public readonly email: string;

  @IsString()
  @IsDefined()
  public readonly password: string;
}
