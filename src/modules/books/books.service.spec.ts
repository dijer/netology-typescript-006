import { BooksService } from './books.service';
import { Book, IBookData } from './books.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BooksController } from './books.controller';

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
  let booksSerivce: BooksService;
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
    booksSerivce = await module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksSerivce).toBeDefined();
  });

  it('should be createBook method', async () => {
    const book = {
      title: 'string',
      description: 'string',
      authors: 'string',
      favorite: 'string',
      fileCover: 'string',
      fileName: 'string',
    };
    expect(await booksSerivce.createBook(book)).toBe(book);
  });

  it('should be getBooks method', async () => {
    const books = [mockBook, mockBook];
    expect(await booksSerivce.getBooks()).toStrictEqual(books);
  });

  it('should be getBook method', async () => {
    expect(await booksSerivce.getBook('test')).toBe(mockBook);
  });

  it('should be updateBook method', async () => {
    const updateObj = {
      title: 'qwe',
    };
    const result = {
      ...mockBook,
      ...updateObj,
    };
    expect(await booksSerivce.updateBook('test', updateObj)).toStrictEqual(
      result,
    );
  });

  it('should be deleteBook method', async () => {
    expect(await booksSerivce.deleteBook('test')).toBe(undefined);
  });
});
