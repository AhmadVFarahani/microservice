// src/infrastructure/repositories/IHouseholdRepository.ts

import { Household } from "../../domain/entities/household";
import { Member } from "../../domain/entities/member";

export interface IHouseholdRepository {
  getAll(): Promise<Household[]>;
  getById(id: number): Promise<Household | null>;
  save(household: Household): Promise<Household>;
  update(household: Household): Promise<void>;
  addMember(member: Member): Promise<void>;
}
