import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
  ];

  private nextId = 3;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  create(title: string, author: string): Book {
    const book: Book = {
      id: this.nextId++,
      title,
      author,
    };

    this.books.push(book);
    return book;
  }
}