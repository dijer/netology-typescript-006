import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { IBook } from './books.interface';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';
import { BookValidationParamPipe } from '../../common/pipes/book-validation-param.pipe';
import { BookValidationPipe } from '../../common/pipes/book-validation.pipe';

@Controller('/api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UsePipes(BookValidationPipe)
  async create(@Body() CreateBookDto: BookDto) {
    return await this.booksService.createBook(CreateBookDto);
  }

  @Get()
  async findAll(): Promise<IBook[]> {
    return await this.booksService.getBooks();
  }

  @Get('/:id')
  @UsePipes(BookValidationParamPipe)
  async getBook(@Param() params): Promise<IBook> {
    return await this.booksService.getBook(params.id);
  }

  @Put('/:id')
  @UsePipes(BookValidationPipe)
  async updateBook(
    @Param() params,
    @Body() UpdateBookDto: BookDto,
  ): Promise<IBook> {
    return await this.booksService.updateBook(params.id, UpdateBookDto);
  }

  @Delete('/:id')
  async deleteBook(@Param() params): Promise<void> {
    return await this.booksService.deleteBook(params.id);
  }
}
