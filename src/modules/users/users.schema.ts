import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUserData {
  email: string;
  password: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
