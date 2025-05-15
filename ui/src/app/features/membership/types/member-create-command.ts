export type MemberCreateCommand = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  membershipType: "basic" | "plus" | "premier" | "go" | "client";
  membershipStartDate: string;
  membershipExpiryDate: string;
  email?: string;
  phoneNumber?: string;
};
