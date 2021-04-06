import { BooksService } from './books.service';
import { Book, IBookData } from './books.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

type IBook = IBookData & { id: string };

const mockBook = {
  id: '1',
  title: 'Title',
  description: 'Description',
  authors: 'Authors',
  favorite: 'Favorite',
  fileCover: 'FileCover',
  fileName: 'FileName',
};

class BooksServiceMock {
  public async createBook(bookData: IBookData): Promise<IBookData> {
    return bookData;
  }
  public async getBooks(): Promise<IBook[]> {
    return [mockBook, mockBook];
  }
  public async getBook(id: string): Promise<IBook> {
    return mockBook;
  }
  public async updateBook(
    id: string,
    data: Partial<IBookData>,
  ): Promise<IBook> {
    return {
      ...mockBook,
      ...data,
    };
  }
  public async deleteBook(id: string): Promise<void> {
    return;
  }
}

describe('BooksService', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: new BooksServiceMock(),
        },
        {
          provide: getModelToken(Book.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('/api/books Get', () => {
    const response = [mockBook, mockBook];
    return request(app.getHttpServer())
      .get('/api/books')
      .expect(200)
      .expect(response);
  });

  it('/api/books Post', () => {
    return request(app.getHttpServer()).post('/api/books').expect(201);
  });

  it('/api/books/:id Get', () => {
    return request(app.getHttpServer())
      .get('/api/books/1')
      .expect(200)
      .expect(mockBook);
  });

  it('/api/books/:id Put', () => {
    return request(app.getHttpServer())
      .put('/api/books/1')
      .expect(200)
      .expect(mockBook);
  });

  it('/api/books/:id Delete', () => {
    return request(app.getHttpServer()).delete('/api/books/1').expect(200);
  });
});
