// src/presentation/routes/household.route.ts

import { FastifyInstance } from "fastify";
import { HouseholdController } from "../controllers/household.controller";
import {
  HouseholdListResponseSchema,
  HouseholdResponseSchema,
  HouseholdCreateRequestSchema,
  MemberCreateRequestSchema,
} from "../schemas/household.schemas";
import { container } from "../../infrastructure/di/container";

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
        body: HouseholdCreateRequestSchema,
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
        body: MemberCreateRequestSchema,
        response: {
          204: { type: "null" },
        },
      },
    },
    controller.addMember
  );
}
