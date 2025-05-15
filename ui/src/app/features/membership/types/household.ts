// src/features/membership/types/Household.ts

import { Member } from "./member";


export type Household = {
  id: number;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isCancelled: boolean;
  cancelledAt: string | null;
  createdAt: string;
  members: Member[];
};
