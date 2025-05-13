// src/domain/entities/member.ts

export type MembershipType = "basic" | "plus" | "premier" | "go" | "client";

export class Member {
  constructor(
    public id: number | null,
    public householdId: number,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public membershipType: MembershipType,
    public membershipStartDate: Date,
    public membershipExpiryDate: Date,
    public email?: string,
    public phoneNumber?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    // ✅ entity must validate itself
    if (!firstName || firstName.length < 2) {
      throw new Error("First name must be at least 2 characters long");
    }
    if (!lastName || lastName.length < 2) {
      throw new Error("Last name must be at least 2 characters long");
    }
    if (!dateOfBirth || !(dateOfBirth instanceof Date)) {
      throw new Error("Valid date of birth is required");
    }
    if (!membershipStartDate || !(membershipStartDate instanceof Date)) {
      throw new Error("Valid membership start date is required");
    }
    if (!membershipExpiryDate || !(membershipExpiryDate instanceof Date)) {
      throw new Error("Valid membership expiry date is required");
    }
  }

  // ✅ domain behavior: change phone number
  public changePhoneNumber(newPhoneNumber: string) {
    if (!newPhoneNumber || newPhoneNumber.length < 7) {
      throw new Error("Phone number must be at least 7 digits long");
    }
    this.phoneNumber = newPhoneNumber;
  }

  // ✅ domain behavior: change email
  public changeEmail(newEmail: string) {
    if (!newEmail || !newEmail.includes("@")) {
      throw new Error("Email must be valid");
    }
    this.email = newEmail;
  }

  // ✅ domain behavior: update profile
  public updateProfile(firstName: string, lastName: string, dateOfBirth: Date) {
    if (!firstName || firstName.length < 2) {
      throw new Error("First name must be at least 2 characters long");
    }
    if (!lastName || lastName.length < 2) {
      throw new Error("Last name must be at least 2 characters long");
    }
    if (!dateOfBirth || !(dateOfBirth instanceof Date)) {
      throw new Error("Valid date of birth is required");
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
  }

  // ✅ domain behavior: change membership
  public updateMembership(
    type: MembershipType,
    startDate: Date,
    expiryDate: Date
  ) {
    if (!startDate || !(startDate instanceof Date)) {
      throw new Error("Valid membership start date is required");
    }
    if (!expiryDate || !(expiryDate instanceof Date)) {
      throw new Error("Valid membership expiry date is required");
    }
    this.membershipType = type;
    this.membershipStartDate = startDate;
    this.membershipExpiryDate = expiryDate;
  }
}
