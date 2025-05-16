// src/application/commands/member-create-command.ts
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { MembershipType } from "../../domain/entities/member";
import { MemberUpdateCommandSchema } from "../../presentation/schemas/household.schemas";

const ajv = new Ajv();
addFormats(ajv); // ✅ this enables "date" format

export interface MemberUpdateCommand {
  memberId: number;
  householdId: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  membershipType?: MembershipType;
  membershipStartDate?: Date;
  membershipExpiryDate?: Date;
  email?: string;
  phoneNumber?: string;
}

export const validateMemberUpdate = ajv.compile(MemberUpdateCommandSchema);
