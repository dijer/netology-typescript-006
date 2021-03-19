import { Body, Controller, Get, Post } from "@nestjs/common";
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
    this.booksService.create(CreateBookDto);
  }

  @Get()
  async findAll(): Promise<IBook[]> {
    return this.booksService.findAll();
  }
}
