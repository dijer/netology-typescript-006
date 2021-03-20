import { Injectable } from '@nestjs/common';
import { IBook } from './books.interface';
import { Book, IBookData } from './books.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<IBook>,
  ) {}

  public async createBook(bookData: IBookData): Promise<IBook> {
    const book = new this.BookModel(bookData);
    await book.save();
    return book;
  }

  public async getBooks(): Promise<IBook[]> {
    const books = await this.BookModel.find();
    return books;
  }

  public async getBook(id: string): Promise<IBook> {
    const book = await this.BookModel.findById(id);
    return book;
  }

  public async updateBook(id: string, data: IBookData): Promise<IBook> {
    const book = await this.BookModel.findByIdAndUpdate(id, data);
    return book;
  }

  public async deleteBook(id: string): Promise<void> {
    await this.BookModel.deleteOne({ _id: id });
  }
}
