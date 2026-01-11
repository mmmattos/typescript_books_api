# typescript_books_api


npm install class-validator class-transformer

npm install prisma --save-dev

npm install @prisma/client

## Initializw Prisma
npx prisma init --datasource-provider sqlite

# Books REST API (NestJS + TypeScript)

A clean, modular **Books REST API** built with **NestJS**, **TypeScript**, **Prisma 6**, and **SQLite**, following industry best practices for layering, validation, testing, and documentation.

This project is intended as a solid foundation for real-world backend services.

---

## ✨ Features

- RESTful API design
- Modular NestJS architecture
- DTO-based validation
- Prisma ORM (v6) with migrations
- SQLite database (Postgres-ready)
- Swagger / OpenAPI documentation
- Unit tests with dependency mocking
- Clean separation of concerns

---

## 🏗️ Architecture Overview

The application follows a **layered architecture**, where each layer has a single, well-defined responsibility.

### Controller Layer
Handles HTTP requests and responses, maps routes, and delegates all business logic to services.

### DTO / Validation Layer
Defines the API contract and validates incoming data using `class-validator` before it reaches the business logic.

### Service Layer
Contains application and domain logic, orchestrating operations and interacting with the persistence layer.

### Persistence Layer (Prisma)
Prisma 6 acts as the ORM and database access layer, translating domain operations into database queries and managing schema migrations.

### Database
SQLite is used for local development and testing, with an easy path to PostgreSQL for production environments.

---

## 🧠 Role of Prisma (Prisma 6)

Prisma 6 provides a **type-safe, schema-driven ORM**, responsible for database access, migrations, and generated TypeScript types, while remaining fully isolated from controllers and HTTP concerns.

---

## 📂 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── books/
│   ├── books.controller.ts
│   ├── books.service.ts
│   ├── books.module.ts
│   ├── dto/
│   │   └── create-book.dto.ts
│   └── tests/
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
prisma/
├── schema.prisma
├── migrations/
```

---

## 📄 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api
```

It provides interactive documentation for all available endpoints and request/response schemas.

---

## 🧪 Testing

Unit tests are implemented using **Jest** and **@nestjs/testing**, with dependencies (including Prisma) mocked to ensure fast, isolated tests.

Run tests with:

```bash
npm run test
```

---

## 🚀 Running the Application

### Install dependencies
```bash
npm install
```

### Run database migrations
```bash
npx prisma migrate dev
```

### Start the application
```bash
npm run start:dev
```

---

## 🔮 Next Steps

Planned improvements include:

- Proper HTTP error handling
- Pagination and filtering
- Environment-based configuration
- Authentication and authorization
- End-to-end (e2e) tests
- Dockerization

---

## 📌 Notes

This project intentionally prioritizes **clarity, correctness, and maintainability** over shortcuts or framework magic, making it suitable for learning, extension, and production use.
