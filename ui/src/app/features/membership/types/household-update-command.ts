export type HouseholdUpdateCommand = {
  id: number;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
};
