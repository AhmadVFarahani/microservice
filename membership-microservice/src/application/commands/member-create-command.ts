// src/application/commands/member-create-command.ts
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { MembershipType } from "../../domain/entities/member";

const ajv = new Ajv();
addFormats(ajv); // ✅ this enables "date" format

export interface MemberCreateCommand {
  householdId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  membershipType: MembershipType;
  membershipStartDate: Date;
  membershipExpiryDate: Date;
  email?: string;
  phoneNumber?: string;
}

export const MemberCreateSchema = {
  type: "object",
  required: [
    "householdId",
    "firstName",
    "lastName",
    "membershipType",
    "dateOfBirth",
    "membershipStartDate",
    "membershipExpiryDate",
  ],
  properties: {
    householdId: { type: "number" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    dateOfBirth: { type: "string", format: "date" },
    membershipType: {
      type: "string",
      enum: ["basic", "plus", "premier", "go", "client"],
    },
    membershipStartDate: { type: "string", format: "date" },
    membershipExpiryDate: { type: "string", format: "date" },
    email: { type: "string" },
  },
};

export const validateMemberCreate = ajv.compile(MemberCreateSchema);
