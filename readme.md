# Node.js Test Project

A Node.js project with TypeScript, Express, Prisma, and comprehensive testing setup.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests (unit tests only - no Docker required)
npm test

# Run tests with coverage
npm run test:coverage
```

## 🧪 Testing Strategy

This project uses a **dual testing approach**:

### Unit Tests (`.unit.spec.ts`)
- ✅ **No external dependencies** (no database, Docker, etc.)
- ✅ **Fast execution** (~1s)
- ✅ **Mocks and in-memory implementations**
- ✅ **100% code coverage**

### Integration Tests (`.integration.spec.ts`)
- 🔧 **Real database required**
- 🔧 **Slower execution**
- 🔧 **End-to-end testing**

## 📋 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Run production build
```

### Testing
```bash
# Unit Tests (Default - No Docker required)
npm test                    # Run unit tests
npm run test:unit          # Run unit tests explicitly
npm run test:coverage      # Unit tests with coverage
npm run test:unit:watch    # Unit tests in watch mode

# Integration Tests (Docker required)
npm run test:integration   # Run integration tests (needs database)
npm run test:all           # Run ALL tests (unit + integration)
npm run test:all:coverage  # All tests with coverage

# Test utilities
npm run test:watch         # Unit tests in watch mode
```

### Database
```bash
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio
```

### Docker
```bash
npm run docker:up          # Start PostgreSQL database
npm run docker:down        # Stop all containers
```

### Code Quality
```bash
npm run lint               # Check code style
npm run lint:fix           # Fix linting issues
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 22+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest with ts-jest
- **Linting**: ESLint with TypeScript support
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
src/
├── entities/           # Domain entities
├── modules/           # Feature modules
│   └── createUser/    # User creation feature
├── repositories/      # Data access layer
│   ├── in-memory/     # Mock implementations
│   └── prisma/        # Database implementations
├── routes/            # Express routes
├── database/          # Database client
├── app.ts             # Express app setup
└── server.ts          # Server entry point

tests/
├── *.unit.spec.ts     # Unit tests (no external deps)
└── *.integration.spec.ts # Integration tests (with DB)
```

## ⚡ Key Features

- **100% Unit Test Coverage** without external dependencies
- **Separated Unit and Integration Tests** for optimal CI/CD
- **Docker-ready** with PostgreSQL and optimized Node.js containers
- **Type-safe** with TypeScript and Prisma
- **Modern tooling** with ESLint 9 and Jest 29
- **Hot reload** development experience
