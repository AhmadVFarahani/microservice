// src/server.ts

import "reflect-metadata";
import Fastify from "fastify";
import cors from "@fastify/cors";

import "./infrastructure/di/container";
import healthRoutes from "./presentation/controllers/health.controller";
import householdRoutes from "./presentation/routes/household.route";
import swaggerPlugin from "./plugins/swagger";
import { runMigrations } from "./infrastructure/database/migration";
import { globalErrorHandler } from "./plugins/global-error-handler";

const app = Fastify({
  logger: true,
});

async function start() {
  try {
    // ✅ Step 1: Database migrations
    await runMigrations();

    // ✅ Step 2: Register CORS (important for Swagger + Frontend)
    await app.register(cors, {
      origin: true, // ✅ allow all origins (or specify e.g. ["http://localhost:3000"])
    });

    // ✅ Step 3: Plugins
    await app.register(swaggerPlugin);

    // ✅ Step 4: Global error handler
    await globalErrorHandler(app);

    // ✅ Step 5: Routes
    app.register(healthRoutes, { prefix: "/health" });
    app.register(householdRoutes, { prefix: "/households" });

    // ✅ Step 6: Start server
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await app.listen({ port: PORT });

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1); // ✅ exit if critical error (ex: DB connection fails)
  }
}

start();
