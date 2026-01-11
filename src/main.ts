import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strip unknown properties
      forbidNonWhitelisted: true, // throw error on unknown properties
      transform: true,            // auto-transform payloads to DTO instances
    }),
  );

  // Swagger / OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('Simple Book REST API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start HTTP server
  await app.listen(3000);
}

bootstrap();import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global Prisma error mapping
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('Simple Book REST API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();