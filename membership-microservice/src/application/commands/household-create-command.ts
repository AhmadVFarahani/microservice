// src/application/commands/HouseholdCreateCommand.ts

export interface HouseholdCreateCommand {
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
}
