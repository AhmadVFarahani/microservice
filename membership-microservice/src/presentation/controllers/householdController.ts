// src/presentation/controllers/HouseholdController.ts

import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { IHouseholdService } from "../../application/interfaces/iHouseholdService";
import { HouseholdCreateCommand } from "../../application/commands/householdCreateCommand";

export default async function (app: FastifyInstance) {
  const service = container.resolve<IHouseholdService>("IHouseholdService");

  app.get(
    "/",
    {
      schema: {
        description: "Get all households",
        tags: ["Households"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                streetAddress: { type: "string" },
                city: { type: "string" },
                province: { type: "string" },
                postalCode: { type: "string" },
                country: { type: "string" },
                phoneNumber: { type: "string" },
                isCancelled: { type: "boolean" },
                cancelledAt: {
                  type: "string",
                  format: "date-time",
                  nullable: true,
                },
              },
            },
          },
        },
      },
    },
    async () => {
      return await service.getAll();
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        description: "Get household by ID",
        tags: ["Households"],
        params: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              streetAddress: { type: "string" },
              city: { type: "string" },
              province: { type: "string" },
              postalCode: { type: "string" },
              country: { type: "string" },
              phoneNumber: { type: "string" },
              isCancelled: { type: "boolean" },
              cancelledAt: {
                type: "string",
                format: "date-time",
                nullable: true,
              },
            },
          },
        },
      },
    },
    async (req) => {
      const id = Number((req.params as any).id);
      return await service.getById(id);
    }
  );

  app.post(
    "/",
    {
      schema: {
        description: "Create new household",
        tags: ["Households"],
        body: {
          type: "object",
          required: ["streetAddress", "city", "province", "postalCode"],
          properties: {
            streetAddress: { type: "string" },
            city: { type: "string" },
            province: { type: "string" },
            postalCode: { type: "string" },
            country: { type: "string" },
            phoneNumber: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              streetAddress: { type: "string" },
              city: { type: "string" },
              province: { type: "string" },
              postalCode: { type: "string" },
              country: { type: "string" },
              phoneNumber: { type: "string" },
              isCancelled: { type: "boolean" },
              cancelledAt: {
                type: "string",
                format: "date-time",
                nullable: true,
              },
            },
          },
        },
      },
    },
    async (req) => {
      const command = req.body as HouseholdCreateCommand;
      return await service.create(command);
    }
  );

  app.patch(
    "/:id/cancel",
    {
      schema: {
        description: "Cancel household by ID",
        tags: ["Households"],
        params: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
        response: {
          204: { type: "null" },
        },
      },
    },
    async (req, reply) => {
      const id = Number((req.params as any).id);
      await service.cancel(id);
      reply.status(204).send();
    }
  );
}
