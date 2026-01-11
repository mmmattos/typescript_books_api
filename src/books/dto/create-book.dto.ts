import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Refactoring',
    description: 'Title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Martin Fowler',
    description: 'Author of the book',
  })
  @IsString()
  @IsNotEmpty()
  author: string;
}