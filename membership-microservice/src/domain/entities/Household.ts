// src/domain/entities/Household.ts

export class Household {
  public isCancelled: boolean;
  public cancelledAt: Date | null;

  constructor(
    public id: number | null,
    public streetAddress: string,
    public city: string,
    public province: string,
    public postalCode: string,
    public country: string = "Canada",
    public phoneNumber?: string,
    public createdAt?: Date,
    public updatedAt?: Date
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
}
