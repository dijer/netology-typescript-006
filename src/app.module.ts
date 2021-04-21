import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { BooksModule } from './modules/books/books.module';
import { BooksController } from './modules/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookCommentModule } from './modules/book-comment/book-comment.module';
import { Auth2Module } from './modules/auth2/auth2.module';
import { Auth2Controller } from './modules/auth2/auth2.controller';
import { CsrfMiddleware } from './common/middlewares/csrf.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    BooksModule,
    UsersModule,
    AuthModule,
    BookCommentModule,
    Auth2Module,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(BooksController);
    consumer.apply(CsrfMiddleware).forRoutes(Auth2Controller);
  }
}
