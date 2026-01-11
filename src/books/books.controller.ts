import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBooksDto } from './dto/query-books.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get books with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Paginated list of books' })
  findAll(@Query() query: QueryBooksDto) {
    const { offset, limit, title, author } = query;

    return this.booksService.findAll({
      offset,
      limit,
      title,
      author,
    }).then(({ data, total }) => ({
      data,
      meta: {
        total,
        limit,
        offset,
      },
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiResponse({ status: 200, description: 'Book found' })
  @ApiResponse({ status: 400, description: 'Invalid id' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created' })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(
      dto.title,
      dto.author,
    );
  }
}