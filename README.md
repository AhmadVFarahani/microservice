# 📄 Membership Microservice

A Clean Architecture Microservice built with **Fastify**, **TypeScript**, **SQL Server**, and **Dependency Injection**.  
Designed for scalability, testability, and enterprise-grade maintainability.

---

## 🚀 Technologies Used

- Fastify
- TypeScript
- SQL Server
- @fastify/swagger & swagger-ui
- tsyringe (Dependency Injection Container)
- dotenv
- Clean Architecture & DDD patterns

---

## 📚 Project Structure

```
src/
├── application/
│   ├── commands/         # Command Models (CQRS Write Models)
│   ├── dto/              # DTOs (CQRS Read Models)
│   ├── interfaces/       # Application Service and Repository Interfaces
│   └── services/         # Application Services (Use Cases)
├── domain/
│   └── entities/         # Domain Entities and Business Logic
├── infrastructure/
│   ├── database/         # Database Connection and Migration
│   └── repositories/     # Repository Implementations
├── presentation/
│   └── controllers/      # Fastify Controllers (Route Handlers)
├── plugins/              # Plugins (Swagger, etc.)
└── server.ts             # Composition Root and Server Entry
```

---

## ⚙️ How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up `.env` file:

   ```
   DB_USER=sa
   DB_PASSWORD=Aa@12345
   DB_SERVER=localhost
   DB_PORT=1433
   DB_NAME=GatewayDb
   PORT=3000
   ```

3. Run the server:

   ```bash
   npm run build
   npm start
   ```

4. Access API documentation:
   ```
   http://localhost:3000/docs
   ```

---

## 📋 Available Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/health`                | Health Check           |
| GET    | `/households`            | Get all Households     |
| GET    | `/households/:id`        | Get Household by ID    |
| POST   | `/households`            | Create new Household   |
| PATCH  | `/households/:id/cancel` | Cancel Household by ID |

---

## 🛠 Architectural Highlights

- Follows **Clean Architecture** and **DDD principles**
- **CQRS** with separated Command Models and DTOs
- **Dependency Injection** using **tsyringe**
- **Infrastructure isolation** with Repositories
- **Swagger** OpenAPI Documentation
- **Singleton SQL Connection Pool**
- **Fully testable and scalable microservice foundation**

---

## 🧠 Author's Note

This microservice was designed to demonstrate enterprise-level patterns including clean separation of concerns, modularity, and production readiness in a Fastify + TypeScript ecosystem.

---

# ✨ Ahmad's Membership Microservice — Clean, Powerful, Production-Ready ✨
