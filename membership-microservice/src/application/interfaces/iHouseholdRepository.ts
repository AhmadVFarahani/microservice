// src/infrastructure/repositories/IHouseholdRepository.ts

import { Household } from "../../domain/entities/household";

export interface IHouseholdRepository {
  getAll(): Promise<Household[]>;
  getById(id: number): Promise<Household | null>;
  save(household: Household): Promise<Household>;
  update(household: Household): Promise<void>;
}
