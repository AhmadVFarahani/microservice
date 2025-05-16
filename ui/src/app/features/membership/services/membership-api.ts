// src/features/membership/services/membershipApi.ts
import axios from "axios";
import { Household } from "../types/household";
import { MemberCreateCommand } from "../types/member-create-command";
import { HouseholdCreateCommand } from "../types/household-create-command";
import { MemberUpdateCommand } from "../types/member-update-command";

// ✅ create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // backend base URL
});

// ✅ GET all households
export const getAllHouseholds = async (): Promise<Household[]> => {
  const response = await api.get<Household[]>("/households/");
  return response.data;
};

// ✅ GET household by ID (with members)
export const getHouseholdById = async (id: number): Promise<Household> => {
  const response = await api.get<Household>(`/households/${id}`);
  return response.data;
};

// ✅ POST create new household
export const createHousehold = async (
  data: HouseholdCreateCommand
): Promise<Household> => {
  const response = await api.post<Household>("/households/", data);
  return response.data;
};

// ✅ PATCH cancel household
export const cancelHousehold = async (id: number): Promise<void> => {
  await api.patch(`/households/${id}/cancel`);
};

// ✅ POST add member to household
export const addMemberToHousehold = async (
  householdId: number,
  data: MemberCreateCommand
): Promise<void> => {
  await api.post(`/households/${householdId}/members`, data);
};

// ✅ PATCH update member in household
export const updateMemberInHousehold = async (
  householdId: number,
  data: MemberUpdateCommand
): Promise<void> => {
  await api.patch(`/households/${householdId}`, data);
};
