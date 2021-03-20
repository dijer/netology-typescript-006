import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { IBook } from './books.interface';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
    this.booksService = new BooksService();
  }

  @Post()
  async create(@Body() CreateBookDto: CreateBookDto) {
    this.booksService.createBook(CreateBookDto);
  }

  @Get()
  async findAll(): Promise<IBook[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param() params): Promise<IBook> {
    return this.booksService.getBook(params.id);
  }

  @Get()
  async updateBook(@Param() params): Promise<IBook> {
    const {
      id,
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    } = params;
    return this.booksService.updateBook(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
  }

  @Delete()
  async deleteBook(@Param() params): Promise<void> {
    return this.booksService.deleteBook(params.id);
  }
}
