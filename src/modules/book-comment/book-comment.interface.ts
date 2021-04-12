import { Document } from 'mongoose';

export interface IBookComment extends Document {
  id: string;
  bookId: string;
  comment: string;
}
