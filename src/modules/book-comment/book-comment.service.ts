import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookComment } from './book-comment.interface';
import { BookComment } from './book-comment.schema';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<IBookComment>,
  ) {}

  public async createBookComment(
    bookId: string,
    comment: string,
  ): Promise<IBookComment> {
    const bookComment = new this.BookCommentModel({
      bookId,
      comment,
    });
    await bookComment.save();
    return bookComment;
  }

  public async getBookComment(id: string): Promise<IBookComment> {
    const bookComment = await this.BookCommentModel.findById(id);
    return bookComment;
  }

  public async patchBookComment(
    id: string,
    data: {
      comment?: string;
      bookId?: string;
    },
  ): Promise<IBookComment> {
    const bookComment = await this.BookCommentModel.findByIdAndUpdate(id, data);
    return bookComment;
  }

  public async deleteBookComment(id: string): Promise<void> {
    await this.BookCommentModel.deleteOne({ _id: id });
  }

  public async findAllBookComment(bookId: string): Promise<IBookComment[]> {
    const bookComments = this.BookCommentModel.find({ bookId });
    return bookComments;
  }
}
