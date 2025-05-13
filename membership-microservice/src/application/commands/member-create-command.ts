// src/application/commands/member-create-command.ts

import { MembershipType } from "../../domain/entities/member";

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
