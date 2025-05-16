export type MemberUpdateCommand = {
  memberId: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth: string;
  membershipType: "basic" | "plus" | "premier" | "go" | "client";
  membershipStartDate: string;
  membershipExpiryDate: string;
  email?: string;
};
