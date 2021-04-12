import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway()
export class GetAllCommentsGateway {
  @WebSocketServer() server;

  constructor(private readonly bookCommentService: BookCommentService) {}

  @SubscribeMessage('getAllComments')
  handleMessage(@MessageBody() bookId: string) {
    const bookComments = this.bookCommentService.findAllBookComment(bookId);
    return bookComments;
  }
}
