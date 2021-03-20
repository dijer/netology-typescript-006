import { IBook } from './books.interface';
import { v4 as uuidv4 } from 'uuid';

export interface IBookData {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

export class Book implements IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  constructor({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  }: IBookData) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}
