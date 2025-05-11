// src/application/services/HouseholdService.ts

import { inject, injectable } from "tsyringe";
import { HouseholdDto } from "../dto/householdDto";
import { HouseholdCreateCommand } from "../commands/householdCreateCommand";
import { IHouseholdService } from "../interfaces/iHouseholdService";
import { IHouseholdRepository } from "../interfaces/iHouseholdRepository";
import { Household } from "../../domain/entities/household";

@injectable()
export class HouseholdService implements IHouseholdService {
  constructor(
    @inject("IHouseholdRepository") private repository: IHouseholdRepository
  ) {}

  async getAll(): Promise<HouseholdDto[]> {
    const households = await this.repository.getAll();
    return households.map(this.mapToDto);
  }

  async getById(id: number): Promise<HouseholdDto | null> {
    const household = await this.repository.getById(id);
    return household ? this.mapToDto(household) : null;
  }

  async create(command: HouseholdCreateCommand): Promise<HouseholdDto> {
    const household = new Household(
      null,
      command.streetAddress,
      command.city,
      command.province,
      command.postalCode,
      command.country ?? "Canada",
      command.phoneNumber
    );

    const saved = await this.repository.save(household);
    return this.mapToDto(saved);
  }

  async cancel(id: number): Promise<void> {
    const household = await this.repository.getById(id);
    if (!household) {
      throw new Error(`Household with ID ${id} not found`);
    }

    household.cancelHousehold();
    await this.repository.update(household);
  }

  // Helper to map entity → DTO
  private mapToDto(h: Household): HouseholdDto {
    return {
      id: h.id,
      streetAddress: h.streetAddress,
      city: h.city,
      province: h.province,
      postalCode: h.postalCode,
      country: h.country,
      phoneNumber: h.phoneNumber,
      isCancelled: h.isCancelled,
      cancelledAt: h.cancelledAt,
    };
  }
}
