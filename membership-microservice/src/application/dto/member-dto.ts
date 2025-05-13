// src/application/dto/member-dto.ts

import { MembershipType } from "../../domain/entities/member";

export interface MemberDto {
  id: number | null;
  householdId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  membershipType: MembershipType;
  membershipStartDate: Date;
  membershipExpiryDate: Date;
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
