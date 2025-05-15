export type HouseholdCreateCommand = {
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
};
