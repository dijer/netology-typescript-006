import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IBook } from './books.interface';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
    this.booksService = new BooksService();
  }

  @Post()
  async create(@Body() CreateBookDto: BookDto) {
    this.booksService.createBook(CreateBookDto);
  }

  @Get()
  async findAll(): Promise<IBook[]> {
    return this.booksService.getBooks();
  }

  @Get('/:id')
  async getBook(@Param() params): Promise<IBook> {
    return this.booksService.getBook(params.id);
  }

  @Put('/:id')
  async updateBook(
    @Param() params,
    @Body() UpdateBookDto: BookDto,
  ): Promise<IBook> {
    return this.booksService.updateBook(params.id, UpdateBookDto);
  }

  @Delete('/:id')
  async deleteBook(@Param() params): Promise<void> {
    return this.booksService.deleteBook(params.id);
  }
}
