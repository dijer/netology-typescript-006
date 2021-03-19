import { Injectable } from '@nestjs/common';
import { IBook } from './books.interface';
import { booksStore } from './books.mocks';

@Injectable()
export class BooksService {
  private readonly books: IBook[] = booksStore;

  create(book: IBook) {
    this.books.push(book);
  }

  findAll(): IBook[] {
    return this.books;
  }
}
