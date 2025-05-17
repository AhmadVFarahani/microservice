// src/presentation/routes/household.route.ts

import { FastifyInstance } from "fastify";
import { HouseholdController } from "../controllers/household.controller";
import {
  HouseholdCreateCommandSchema,
  HouseholdListResponseSchema,
  HouseholdResponseSchema,
  MemberCreateCommandSchema,
  MemberUpdateCommandSchema,
} from "../schemas/household.schemas";
import { container } from "../../infrastructure/di/container";
import { HouseholdUpdateCommandSchema } from "../../application/commands/household-update-command";

export default async function (app: FastifyInstance) {
  const controller = container.resolve(HouseholdController);

  app.get(
    "/",
    {
      schema: {
        description: "Get all households",
        tags: ["Households"],
        response: {
          200: HouseholdListResponseSchema,
        },
      },
    },
    controller.getAll
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
          200: HouseholdResponseSchema,
        },
      },
    },
    controller.getById
  );

  app.post(
    "/",
    {
      schema: {
        description: "Create new household",
        tags: ["Households"],
        body: HouseholdCreateCommandSchema,
        response: {
          200: HouseholdResponseSchema,
        },
      },
    },
    controller.create
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
    controller.cancel
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
        body: MemberCreateCommandSchema,
        response: {
          204: { type: "null" },
        },
      },
    },
    controller.addMember
  );

  app.patch(
    "/:householdId/members",
    {
      schema: {
        description: "Update an existing member of a household",
        tags: ["Households"],
        params: {
          type: "object",
          properties: {
            householdId: { type: "number" },
          },
          required: ["householdId"],
        },
        body: MemberUpdateCommandSchema,
        response: {
          204: { type: "null" },
          400: { type: "object", properties: { message: { type: "string" } } },
          404: { type: "object", properties: { message: { type: "string" } } },
        },
      },
    },
    controller.updateMember
  );
  app.patch(
    "/:id",
    {
      schema: {
        description: "Update a household",
        tags: ["Households"],
        params: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
        body: HouseholdUpdateCommandSchema,
        response: {
          204: { type: "null" },
        },
      },
    },
    controller.update
  );
}
