// src/application/services/household.service.spec.ts

import "reflect-metadata";
import { HouseholdService } from "./household.service";
import { HouseholdRepository } from "../../infrastructure/repositories/household.repository";
import { Household } from "../../domain/entities/household";

jest.mock("../../infrastructure/repositories/household.repository");

describe("HouseholdService", () => {
  let service: HouseholdService;
  let repositoryMock: jest.Mocked<HouseholdRepository>;

  beforeEach(() => {
    repositoryMock =
      new HouseholdRepository() as jest.Mocked<HouseholdRepository>;
    repositoryMock.getById = jest.fn();
    service = new HouseholdService(repositoryMock);
  });

  it("should return household by id", async () => {
    const fakeHousehold = new Household(
      1,
      "123 Main",
      "City",
      "Province",
      "12345"
    );
    repositoryMock.getById.mockResolvedValue(fakeHousehold);

    const result = await service.getById(1);

    expect(result).toEqual(fakeHousehold);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  it("should return null if household not found", async () => {
    repositoryMock.getById.mockResolvedValue(null);

    const result = await service.getById(99);

    expect(result).toBeNull();
  });
});
