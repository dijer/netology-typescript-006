import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway()
export class AddCommentGateway {
  @WebSocketServer() server;

  constructor(private readonly bookCommentService: BookCommentService) {}

  @SubscribeMessage('addComment')
  handleMessage(@MessageBody() bookId: string, comment: string) {
    const bookComment = this.bookCommentService.createBookComment(
      bookId,
      comment,
    );
    return bookComment;
  }
}
