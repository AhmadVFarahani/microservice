// src/application/interfaces/IHouseholdService.ts

import { HouseholdDto } from "../dto/householdDto";
import { HouseholdCreateCommand } from "../commands/householdCreateCommand";

export interface IHouseholdService {
  getAll(): Promise<HouseholdDto[]>;
  getById(id: number): Promise<HouseholdDto | null>;
  create(command: HouseholdCreateCommand): Promise<HouseholdDto>;
  cancel(id: number): Promise<void>;
}
