import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(params: {
    offset: number;
    limit: number;
    title?: string;
    author?: string;
  }): Promise<{ data: Book[]; total: number }> {
    const { offset, limit, title, author } = params;

    const where = {
      ...(title && {
        title: {
          contains: title,
          mode: 'insensitive' as const,
        },
      }),
      ...(author && {
        author: {
          contains: author,
          mode: 'insensitive' as const,
        },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return { data, total };
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async create(title: string, author: string): Promise<Book> {
    return this.prisma.book.create({
      data: { title, author },
    });
  }
}