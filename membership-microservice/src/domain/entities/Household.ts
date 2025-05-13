// src/domain/entities/household.ts

import { Member } from "./member";

export class Household {

  constructor(
    public id: number | null,
    public streetAddress: string,
    public city: string,
    public province: string,
    public postalCode: string,
    public country: string = "Canada",
    public phoneNumber?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public members: Member[] = [],
    public isCancelled: boolean = false,
    public cancelledAt: Date | null = null
  ) {
    // Entity must validate itself
    if (!streetAddress || streetAddress.length < 5) {
      throw new Error("Street address must be at least 5 characters long");
    }
    if (!city) {
      throw new Error("City is required");
    }
    if (!province) {
      throw new Error("Province is required");
    }
    if (!postalCode) {
      throw new Error("Postal code is required");
    }

    this.isCancelled = false;
    this.cancelledAt = null;
  }

  // Domain behavior: allow changing address
  public changeAddress(newAddress: string) {
    if (!newAddress || newAddress.length < 5) {
      throw new Error("Address must be at least 5 characters long");
    }
    this.streetAddress = newAddress;
  }

  // Domain behavior: cancel the household
  public cancelHousehold() {
    if (this.isCancelled) {
      throw new Error("Household is already cancelled");
    }
    this.isCancelled = true;
    this.cancelledAt = new Date();
  }

  // ✅ domain behavior: add member
  public addMember(member: Member) {
    const exists = this.members.some((m) => m.id === member.id);
    if (exists) {
      throw new Error("Member with same ID already exists in this household");
    }
    this.members.push(member);
  }

  // ✅ domain behavior: remove member
  public removeMember(memberId: number) {
    const index = this.members.findIndex((m) => m.id === memberId);
    if (index === -1) {
      throw new Error("Member not found in this household");
    }
    this.members.splice(index, 1);
  }

  // ✅ domain behavior: get all members
  public getMembers(): Member[] {
    return [...this.members]; // return a copy to avoid external mutation
  }

  // ✅ domain behavior: get member by ID
  public getMemberById(memberId: number): Member | undefined {
    return this.members.find((m) => m.id === memberId);
  }
}
