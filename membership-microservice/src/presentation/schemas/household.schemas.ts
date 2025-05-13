// src/presentation/schemas/household.schemas.ts

export const MemberSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    householdId: { type: "number" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    dateOfBirth: { type: "string", format: "date" },
    membershipType: {
      type: "string",
      enum: ["basic", "plus", "premier", "go", "client"],
    },
    membershipStartDate: { type: "string", format: "date" },
    membershipExpiryDate: { type: "string", format: "date" },
    email: { type: "string", format: "email" },
    phoneNumber: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: ["string", "null"], format: "date-time" },
  },
};

export const HouseholdResponseSchema = {
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
      items: MemberSchema,
    },
  },
};

export const HouseholdListResponseSchema = {
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
      cancelledAt: { type: ["string", "null"], format: "date-time" },
    },
  },
};

export const HouseholdCreateRequestSchema = {
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

export const MemberCreateRequestSchema = {
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
};
