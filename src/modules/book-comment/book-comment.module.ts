import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCommentGateway } from './add-comment.gateway';
import { BookComment, BookCommentSchema } from './book-comment.schema';
import { BookCommentService } from './book-comment.service';
import { GetAllCommentsGateway } from './get-all-comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookComment.name,
        schema: BookCommentSchema,
      },
    ]),
  ],
  providers: [BookCommentService, AddCommentGateway, GetAllCommentsGateway],
  exports: [BookCommentService],
})
export class BookCommentModule {}
