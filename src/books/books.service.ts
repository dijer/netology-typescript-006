import { Injectable } from '@nestjs/common';
import { IBook } from './books.interface';
import { Book, IBookData } from './books.model';
import { booksStore } from './books.mocks';

@Injectable()
export class BooksService {
  private readonly books: IBook[] = booksStore;

  createBook(bookData: IBookData): IBook {
    const book = new Book(bookData);
    this.books.push(book);
    return book;
  }

  getBooks(): IBook[] {
    return this.books;
  }

  getBook(id: string): IBook {
    const book = this.books.find(({ id: bookId }: IBook) => id === bookId);
    return book;
  }

  updateBook(id: string, data: IBookData): IBook {
    const book = this.getBook(id);
    const { title, description, authors, favorite, fileCover, fileName } = data;
    if (typeof title === 'string') {
      book.title = title;
    }
    if (typeof description === 'string') {
      book.description = description;
    }
    if (typeof authors === 'string') {
      book.authors = authors;
    }
    if (typeof favorite === 'string') {
      book.favorite = favorite;
    }
    if (typeof fileCover === 'string') {
      book.fileCover = fileCover;
    }
    if (typeof fileName === 'string') {
      book.fileName = fileName;
    }
    return book;
  }

  deleteBook(id: string) {
    const bookIndex = this.books.findIndex(
      ({ id: bookId }: IBook) => bookId === id,
    );
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }
}
