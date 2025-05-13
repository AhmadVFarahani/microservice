// src/tests/membership.integration.spec.ts
import "reflect-metadata";
import Fastify from "fastify";
import cors from "@fastify/cors";

import swaggerPlugin from "../plugins/swagger";
import { globalErrorHandler } from "../plugins/global-error-handler";
import householdRoutes from "../presentation/routes/household.route";

describe("Membership Microservice Integration Tests", () => {
  let app: ReturnType<typeof Fastify>;
  let householdId: number;

  beforeAll(async () => {
    app = Fastify({ logger: false });

    await app.register(cors);
    await app.register(swaggerPlugin);
    await globalErrorHandler(app);
    app.register(householdRoutes, { prefix: "/households" });
  });

  it("✅ Create a Household", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/households",
      payload: {
        streetAddress: "123 Main St",
        city: "Vancouver",
        province: "BC",
        postalCode: "V5K0A1",
        country: "Canada",
        phoneNumber: "1234567890",
      },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.id).toBeDefined();
    expect(body.streetAddress).toBe("123 Main St");

    householdId = body.id;
  });

  it("✅ Get Household by ID", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/households/${householdId}`,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.id).toBe(householdId);
    expect(body.members).toEqual([]);
  });

  it("✅ Add Member to Household", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/households/${householdId}/members`,
      payload: {
        firstName: "Ahmad",
        lastName: "Farahani",
        dateOfBirth: "2000-05-12",
        membershipType: "basic",
        membershipStartDate: "2025-05-12",
        membershipExpiryDate: "2026-05-12",
        email: "ahmad@example.com",
        phoneNumber: "1234567890",
      },
    });

    expect(response.statusCode).toBe(204);
  });

  it("✅ Cancel Household", async () => {
    const response = await app.inject({
      method: "PATCH",
      url: `/households/${householdId}/cancel`,
    });

    expect(response.statusCode).toBe(204);
  });
});
