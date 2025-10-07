# Node.js Test Project

[![CI](https://github.com/luizcurti/node-test/actions/workflows/ci.yml/badge.svg)](https://github.com/luizcurti/node-test/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/luizcurti/node-test/branch/main/graph/badge.svg)](https://codecov.io/gh/luizcurti/node-test)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

A Node.js project with TypeScript, Express, Prisma, and comprehensive testing setup.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Install dependencies
npm install

# Run automated setup (starts Docker + migrations + build)
./setup.sh
```

The setup script will:
- ✅ Start Docker containers (PostgreSQL + Node.js app)
- ✅ Wait for database to be ready
- ✅ Run database migrations
- ✅ Generate Prisma client
- ✅ Build the TypeScript project

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Start database
npm run docker:up

# Run migrations
npm run prisma:migrate

# Build project
npm run build

# Run development server
npm run dev
```

### Option 3: Development Only (No Docker)

```bash
# Install dependencies
npm install

# Run unit tests (no database required)
npm test

# Run development server (database features won't work)
npm run dev
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

## �️ Setup Script

The `./setup.sh` script provides a one-command setup for the entire development environment:

```bash
./setup.sh
```

**What it does:**
- 🔍 Checks if Docker is running
- 🐳 Builds and starts Docker containers
- ⏳ Waits for PostgreSQL to be healthy
- 🔄 Runs database migrations
- 🔧 Generates Prisma client
- 🏗️ Builds TypeScript project
- 📋 Shows available commands and running services

**Requirements:**
- Docker Desktop running
- Node.js 22+ installed
- npm dependencies installed (`npm install`)

### Cleanup Script

To stop all services and clean up Docker resources:

```bash
./cleanup.sh
```

**What it does:**
- 🛑 Stops all Docker containers
- 🧹 Removes orphaned containers and networks
- 💾 Cleans up unused Docker volumes and images

## �📋 Available Scripts

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

### Setup Scripts
```bash
./setup.sh                 # Complete automated setup
./cleanup.sh               # Stop services and cleanup
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
