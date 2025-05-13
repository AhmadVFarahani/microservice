// src/presentation/controllers/healthController.ts

import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["System"],
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string", example: "OK" },
              message: {
                type: "string",
                example: "Membership Microservice is healthy",
              },
            },
          },
        },
      },
    },
    async () => {
      return { status: "OK", message: "Membership Microservice is healthy" };
    }
  );
}
