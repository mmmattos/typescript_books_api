import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async create(
    title: string,
    author: string,
  ): Promise<Book> {
    return this.prisma.book.create({
      data: {
        title,
        author,
      },
    });
  }
}