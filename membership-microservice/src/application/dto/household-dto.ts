// src/application/dto/HouseholdDto.ts

import { MemberDto } from "./member-dto";

export interface HouseholdDto {
  id: number | null;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isCancelled: boolean;
  cancelledAt: Date | null;
  createdAt: Date;
  members: MemberDto[]; // ✅ added child aggregate members
}
