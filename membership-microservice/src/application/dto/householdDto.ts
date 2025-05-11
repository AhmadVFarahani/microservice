// src/application/dto/HouseholdDto.ts

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
}
