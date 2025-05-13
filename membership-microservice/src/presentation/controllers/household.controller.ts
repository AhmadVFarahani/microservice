// src/presentation/controllers/HouseholdController.ts

import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { IHouseholdService } from "../../application/interfaces/ihousehold.Service";
import { HouseholdCreateCommand } from "../../application/commands/household-create-command";
import { MemberCreateCommand } from "../../application/commands/member-create-command";

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
              cancelledAt: { type: ["string", "null"], format: "date-time" },
              createdAt: { type: "string", format: "date-time" },
              members: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    householdId: { type: "number" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    dateOfBirth: { type: "string", format: "date" },
                    membershipType: { type: "string" },
                    membershipStartDate: { type: "string", format: "date" },
                    membershipExpiryDate: { type: "string", format: "date" },
                    email: { type: "string", format: "email" },
                    phoneNumber: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: {
                      type: ["string", "null"],
                      format: "date-time",
                    },
                  },
                },
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
  app.post(
    "/:id/members",
    {
      schema: {
        description: "Add a new member to Household by ID",
        tags: ["Households"],
        params: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
        body: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "dateOfBirth",
            "membershipType",
            "membershipStartDate",
            "membershipExpiryDate",
          ],
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            dateOfBirth: { type: "string", format: "date" },
            membershipType: {
              type: "string",
              enum: ["basic", "plus", "premier", "go", "client"],
            },
            membershipStartDate: { type: "string", format: "date" },
            membershipExpiryDate: { type: "string", format: "date" },
            email: { type: "string" },
            phoneNumber: { type: "string" },
          },
        },
        response: {
          204: { type: "null" },
        },
      },
    },
    async (req, reply) => {
      const id = Number((req.params as any).id);
      const command = req.body as MemberCreateCommand;

      // ✅ Application Service
      await service.addMember(id, {
        ...command,
        dateOfBirth: new Date(command.dateOfBirth),
        membershipStartDate: new Date(command.membershipStartDate),
        membershipExpiryDate: new Date(command.membershipExpiryDate),
      });

      reply.status(204).send();
    }
  );
}
