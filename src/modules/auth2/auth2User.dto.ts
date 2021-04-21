import { IsDefined, IsString } from 'class-validator';

export class Auth2Dto {
  @IsString()
  @IsDefined()
  public readonly displayName: string;

  @IsString()
  @IsDefined()
  public readonly email: string;

  @IsString()
  @IsDefined()
  public readonly password: string;
}
