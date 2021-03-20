import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IBookData {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public authors: string;

  @Prop()
  public favorite: string;

  @Prop()
  public fileCover: string;

  @Prop()
  public fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
