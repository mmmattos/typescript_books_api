import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'List of all books',
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiResponse({
    status: 200,
    description: 'Book found',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'Book successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto.title, dto.author);
  }
}