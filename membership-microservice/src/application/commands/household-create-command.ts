// src/application/commands/HouseholdCreateCommand.ts
import Ajv from "ajv";

const ajv = new Ajv();

export interface HouseholdCreateCommand {
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
}

export const HouseholdCreateSchema = {
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
};

export const validateHouseholdCreate = ajv.compile(HouseholdCreateSchema);
