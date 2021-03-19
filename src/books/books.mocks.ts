import { IBook } from './books.interface';

const book1: IBook = {
  title: 'title',
  description: 'description',
  authors: 'authors',
  favorite: 'favorite',
  fileCover: 'fileCover',
  fileName: 'fileName',
};

const book2: IBook = {
  title: 'title2',
  description: 'description2',
  authors: 'authors2',
  favorite: 'favorite2',
  fileCover: 'fileCover2',
  fileName: 'fileName2',
};

export const booksStore: IBook[] = [book1, book2];
