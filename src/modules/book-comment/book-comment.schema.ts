import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookComment extends Document {
  @Prop({ required: true })
  public bookId: string;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
