import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { IBookData } from './books.schema';

@Injectable()
export class BooksService {
  public async createBook(bookData: IBookData) {
    const db = admin.database();
    const book = (await db.ref('books').push(bookData).once('value')).val();
    return book;
  }

  public async getBooks() {
    const db = admin.database();
    const books = [];
    const res = (await db.ref('books').once('value')).val();
    for (const i in res) {
      books.push({
        id: i,
        ...res[i],
      });
    }
    return books;
  }

  public async getBook(id: string) {
    const book = await admin.database().ref('books').child(id).once('value');
    return book;
  }

  public async updateBook(id: string, data: Partial<IBookData>) {
    const book = await admin.database().ref('books').child(id).update(data);
    return book;
  }

  public async deleteBook(id: string): Promise<void> {
    await admin.database().ref('books').child(id).remove();
  }
}
