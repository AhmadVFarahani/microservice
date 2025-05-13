// src/server.ts

import "reflect-metadata";
import Fastify from "fastify";
import { container } from "tsyringe";
import { HouseholdService } from "./application/services/household.service";
import { IHouseholdService } from "./application/interfaces/ihousehold.Service";
import { HouseholdRepository } from "./infrastructure/repositories/household.repository";
import { IHouseholdRepository } from "./application/interfaces/ihousehold.Repository"; // اگر منتقل شده باشه
import healthRoutes from "./presentation/controllers/health.controller"; // to be created later
import householdRoutes from "./presentation/controllers/household.controller"; // to be created later
import swaggerPlugin from "./plugins/wagger";
import { runMigrations } from "./infrastructure/database/migration";

const app = Fastify({ logger: true });

// DI Registrations
container.register<IHouseholdRepository>("IHouseholdRepository", {
  useClass: HouseholdRepository,
});
container.register<IHouseholdService>("IHouseholdService", {
  useClass: HouseholdService,
});

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
