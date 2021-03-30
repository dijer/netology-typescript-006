import { IsDefined, IsString, MaxLength } from 'class-validator';

export class BookDto {
  @IsString()
  @MaxLength(255)
  @IsDefined()
  public readonly title: string = '';

  @IsString()
  public readonly description: string = '';

  @IsString()
  public readonly authors: string = '';

  @IsString()
  public readonly favorite: string = '';

  @IsString()
  public readonly fileCover: string = '';

  @IsString()
  public readonly fileName: string = '';
}
