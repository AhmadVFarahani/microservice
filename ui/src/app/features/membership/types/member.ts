// src/features/membership/types/Member.ts

export type Member = {
  id: number;
  householdId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  membershipType: "basic" | "plus" | "premier" | "go" | "client";
  membershipStartDate: string;
  membershipExpiryDate: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string | null;
};
