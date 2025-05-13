// src/server.ts

import "reflect-metadata";
import Fastify from "fastify";

import "reflect-metadata";
import "./infrastructure/di/container";

import healthRoutes from "./presentation/controllers/health.controller"; // to be created later
import householdRoutes from "./presentation/routes/household.route"; // to be created later
import swaggerPlugin from "./plugins/wagger";
import { runMigrations } from "./infrastructure/database/migration";

const app = Fastify({ logger: true });

// Plugins
app.register(swaggerPlugin);

// Routes (we will create these soon)
app.register(healthRoutes, { prefix: "/health" });
app.register(householdRoutes, { prefix: "/households" });

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function start() {
  await runMigrations(); // ✅ Add this line

  await app.listen({ port: PORT });
  console.log(`🚀 Server running on port ${PORT}`);
}

start();
