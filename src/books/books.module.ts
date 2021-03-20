import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
