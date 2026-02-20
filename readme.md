# Node.js Test Project

[![CI](https://github.com/luizcurti/node-test/actions/workflows/ci.yml/badge.svg)](https://github.com/luizcurti/node-test/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/luizcurti/node-test/branch/main/graph/badge.svg)](https://codecov.io/gh/luizcurti/node-test)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

REST API built with Node.js, TypeScript, Express, Prisma ORM and full test coverage.

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
npm install
./setup.sh
```

The script will:
- ✅ Start Docker containers (PostgreSQL)
- ✅ Wait for the database to be ready
- ✅ Run database migrations
- ✅ Generate Prisma client
- ✅ Build the TypeScript project

### Option 2: Manual Setup

```bash
npm install
npm run docker:up
npm run prisma:migrate
npm run build
npm run dev
```

### Option 3: Unit Tests Only (No Docker)

```bash
npm install
npm test
```

---

## 📡 API — Routes

Base URL: `http://localhost:<PORT>`

### Users

| Method | Route | Description | Success status |
|--------|-------|-------------|----------------|
| `POST` | `/users` | Create a user | `201 Created` |
| `GET` | `/users` | List all users | `200 OK` |
| `GET` | `/users/:id` | Get user by ID | `200 OK` |
| `PUT` | `/users/:id` | Update a user | `200 OK` |
| `DELETE` | `/users/:id` | Delete a user | `204 No Content` |

### Examples

**POST /users**
```json
{
  "name": "Alice Silva",
  "username": "alicesilva",
  "email": "alice@example.com"
}
```

**PUT /users/:id** — all fields are optional (at least 1 required)
```json
{
  "name": "Alice Oliveira"
}
```

### Response codes

| Code | Situation |
|------|-----------|
| `201` | User created successfully |
| `200` | Operation successful |
| `204` | User deleted (no body) |
| `404` | User not found |
| `409` | Username or email already in use |
| `422` | Joi validation failed (details in body) |
| `500` | Unexpected internal error |

### Validation error format (422)
```json
{
  "error": "Validation error",
  "details": [
    "\"email\" must be a valid email",
    "\"username\" must only contain alpha-numeric characters"
  ]
}
```

---

## 🧪 Testing

### Dual strategy

| Type | File pattern | Database | Speed |
|------|-------------|----------|-------|
| **Unit** | `*.unit.spec.ts` | ❌ In-memory | ~1s |
| **Integration** | `*.integration.spec.ts` | ✅ Real PostgreSQL | ~5-10s |

### Commands

```bash
# Unit tests (default, no Docker required)
npm test
npm run test:unit
npm run test:coverage
npm run test:unit:watch

# Integration tests (Docker required)
npm run test:integration

# All tests
npm run test:all
npm run test:all:coverage
```

### Current coverage

```
Test Suites: 6 passed
Tests:       14 passed
```

---

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript
npm start            # Run production build
```

### Database
```bash
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio
```

### Docker
```bash
npm run docker:up          # Start PostgreSQL
npm run docker:down        # Stop containers
./setup.sh                 # Full automated setup
./cleanup.sh               # Stop and clean up everything
```

### Code Quality
```bash
npm run lint               # Check code style
npm run lint:fix           # Auto-fix linting issues
```

---

## 📁 Project Structure

```
src/
├── errors/
│   └── AppError.ts              # Custom error class with statusCode
├── entities/
│   └── User.ts                  # User entity + IUserProps, IUserUpdateProps interfaces
├── modules/
│   ├── createUser/              # POST /users
│   ├── listUsers/               # GET /users
│   ├── getUserById/             # GET /users/:id
│   ├── updateUser/              # PUT /users/:id
│   └── deleteUser/              # DELETE /users/:id
├── repositories/
│   ├── IUsersRepositories.ts    # Interface (create, exists, findAll, findById, update, delete)
│   ├── in-memory/               # In-memory implementation for unit tests
│   └── prisma/                  # PostgreSQL implementation
├── routes/
│   └── routes.ts                # All route definitions
├── database/
│   └── client.ts                # Prisma client singleton
├── app.ts                       # Express app setup
└── server.ts                    # Entry point

prisma/
├── schema.prisma                # Database schema
└── prisma-environment-jest.js   # Isolated environment for integration tests
```

Each module follows this pattern:
```
moduleX/
├── ModuleXService.ts                     # Business logic
├── ModuleXController.ts                  # Joi validation + HTTP handling
├── ModuleXFactory.ts                     # Dependency composition
├── ModuleXService.unit.spec.ts           # Unit tests for the service
└── ModuleXController.integration.spec.ts # Integration tests
```

---

## 🛡️ Validation

All HTTP inputs are validated with **Joi** in the controller before reaching the service:

- `name`: string, 2–100 characters, required on create
- `username`: alphanumeric string, 3–50 characters, required on create
- `email`: valid email format, required on create
- On update: at least one field must be provided

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 22+ |
| Language | TypeScript 5.8 |
| Framework | Express 5 |
| ORM | Prisma 6 + PostgreSQL 16 |
| Validation | Joi 17 |
| Testing | Jest 29 + ts-jest + Supertest |
| Linting | ESLint 9 + typescript-eslint |
| Containers | Docker & Docker Compose |


---

## 🚀 Quick Start

### Opção 1: Setup automatizado (recomendado)

```bash
npm install
./setup.sh
```

O script irá:
- ✅ Iniciar os containers Docker (PostgreSQL)
- ✅ Aguardar o banco estar pronto
- ✅ Rodar as migrations
- ✅ Gerar o Prisma client
- ✅ Fazer o build do TypeScript

### Opção 2: Manual

```bash
npm install
npm run docker:up
npm run prisma:migrate
npm run build
npm run dev
```

### Opção 3: Somente testes unitários (sem Docker)

```bash
npm install
npm test
```

---

## 📡 API — Rotas

Base URL: `http://localhost:<PORT>`

### Usuários

| Método | Rota | Descrição | Status de sucesso |
|--------|------|-----------|-------------------|
| `POST` | `/users` | Criar usuário | `201 Created` |
| `GET` | `/users` | Listar todos os usuários | `200 OK` |
| `GET` | `/users/:id` | Buscar usuário por ID | `200 OK` |
| `PUT` | `/users/:id` | Atualizar usuário | `200 OK` |
| `DELETE` | `/users/:id` | Deletar usuário | `204 No Content` |

### Exemplos

**POST /users**
```json
{
  "name": "Alice Silva",
  "username": "alicesilva",
  "email": "alice@example.com"
}
```

**PUT /users/:id** — todos os campos são opcionais (mínimo 1)
```json
{
  "name": "Alice Oliveira"
}
```

### Códigos de resposta

| Código | Situação |
|--------|----------|
| `201` | Usuário criado com sucesso |
| `200` | Operação bem-sucedida |
| `204` | Usuário deletado (sem body) |
| `404` | Usuário não encontrado |
| `409` | Username ou e-mail já em uso |
| `422` | Falha na validação Joi (detalhes no body) |
| `500` | Erro interno inesperado |

### Formato de erro de validação (422)
```json
{
  "error": "Validation error",
  "details": [
    "\"email\" must be a valid email",
    "\"username\" must only contain alpha-numeric characters"
  ]
}
```

---

## 🧪 Testes

### Estratégia dupla

| Tipo | Padrão de arquivo | Banco de dados | Velocidade |
|------|-------------------|----------------|------------|
| **Unit** | `*.unit.spec.ts` | ❌ In-memory | ~1s |
| **Integration** | `*.integration.spec.ts` | ✅ PostgreSQL real | ~5-10s |

### Comandos

```bash
# Unitários (padrão, sem Docker)
npm test
npm run test:unit
npm run test:coverage
npm run test:unit:watch

# Integração (Docker necessário)
npm run test:integration

# Todos
npm run test:all
npm run test:all:coverage
```

### Cobertura atual

```
Test Suites: 6 passed
Tests:       14 passed
```

---

## 🛠️ Scripts disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor com hot reload
npm run build        # Compilar TypeScript
npm start            # Rodar build de produção
```

### Banco de dados
```bash
npm run prisma:generate    # Gerar Prisma client
npm run prisma:migrate     # Rodar migrations
npm run prisma:studio      # Abrir Prisma Studio
```

### Docker
```bash
npm run docker:up          # Iniciar PostgreSQL
npm run docker:down        # Parar containers
./setup.sh                 # Setup completo automatizado
./cleanup.sh               # Parar e limpar tudo
```

### Qualidade de código
```bash
npm run lint               # Verificar estilo
npm run lint:fix           # Corrigir automaticamente
```

---

## 📁 Estrutura do projeto

```
src/
├── errors/
│   └── AppError.ts              # Erro customizado com statusCode
├── entities/
│   └── User.ts                  # Entidade User + interfaces IUserProps, IUserUpdateProps
├── modules/
│   ├── createUser/              # POST /users
│   ├── listUsers/               # GET /users
│   ├── getUserById/             # GET /users/:id
│   ├── updateUser/              # PUT /users/:id
│   └── deleteUser/              # DELETE /users/:id
├── repositories/
│   ├── IUsersRepositories.ts    # Interface (create, exists, findAll, findById, update, delete)
│   ├── in-memory/               # Implementação para testes unitários
│   └── prisma/                  # Implementação com PostgreSQL
├── routes/
│   └── routes.ts                # Definição de todas as rotas
├── database/
│   └── client.ts                # Prisma client singleton
├── app.ts                       # Configuração do Express
└── server.ts                    # Entry point

prisma/
├── schema.prisma                # Schema do banco
└── prisma-environment-jest.js   # Ambiente isolado para testes de integração
```

Cada módulo segue o padrão:
```
moduleX/
├── ModuleXService.ts                    # Regras de negócio
├── ModuleXController.ts                 # Validação (Joi) + HTTP
├── ModuleXFactory.ts                    # Composição das dependências
├── ModuleXService.unit.spec.ts          # Testes unitários do service
└── ModuleXController.integration.spec.ts # Testes de integração
```

---

## 🛡️ Validação

As entradas HTTP são validadas com **Joi** no controller antes de chegarem ao service:

- `name`: string, 2–100 caracteres, obrigatório no create
- `username`: string alfanumérica, 3–50 caracteres, obrigatório no create
- `email`: e-mail válido, obrigatório no create
- No update: ao menos um campo deve ser enviado

---

## 🏗️ Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Node.js 22+ |
| Linguagem | TypeScript 5.8 |
| Framework | Express 5 |
| ORM | Prisma 6 + PostgreSQL 16 |
| Validação | Joi 17 |
| Testes | Jest 29 + ts-jest + Supertest |
| Lint | ESLint 9 + typescript-eslint |
| Containers | Docker & Docker Compose |
