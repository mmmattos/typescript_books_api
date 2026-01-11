import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import type { Book } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book | undefined {
    return this.booksService.findOne(Number(id));
  }

    @Post()
    create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto.title, dto.author);
    }
}