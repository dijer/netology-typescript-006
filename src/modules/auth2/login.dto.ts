import { IsDefined, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  public readonly idToken: string;
}
