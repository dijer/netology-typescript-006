import { IsDefined, IsString } from 'class-validator';

export class BookCommentDto {
  @IsString()
  @IsDefined()
  public readonly id: string;

  @IsString()
  @IsDefined()
  public readonly bookId: string;

  @IsString()
  @IsDefined()
  public readonly comment: string;
}
