// src/presentation/controllers/household.controller.spec.ts

import "reflect-metadata"; //
import { HouseholdDto } from "../../application/dto/household-dto";
import { IHouseholdService } from "../../application/interfaces/ihousehold.Service";
import { HouseholdController } from "./household.controller";

describe("HouseholdController", () => {
  let controller: HouseholdController;
  let serviceMock: jest.Mocked<IHouseholdService>;
  let replyMock: any;

  beforeEach(() => {
    serviceMock = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      cancel: jest.fn(),
      addMember: jest.fn(),
    } as any;

    controller = new HouseholdController();
    (controller as any).service = serviceMock;

    replyMock = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };
  });

  it("should return all households", async () => {
    const fakeHouseholds: HouseholdDto[] = [
      {
        id: 1,
        streetAddress: "123 Main St",
        city: "Vancouver",
        province: "BC",
        postalCode: "V5K0A1",
        country: "Canada",
        phoneNumber: "123-456-7890",
        isCancelled: false,
        cancelledAt: null,
        createdAt: new Date(),
        members: [],
      },
      {
        id: 2,
        streetAddress: "456 Oak Ave",
        city: "Burnaby",
        province: "BC",
        postalCode: "V5K0B2",
        country: "Canada",
        phoneNumber: "987-654-3210",
        isCancelled: false,
        cancelledAt: null,
        createdAt: new Date(),
        members: [],
      },
    ];

    serviceMock.getAll.mockResolvedValue(fakeHouseholds);

    await controller.getAll({} as any, replyMock);

    expect(serviceMock.getAll).toHaveBeenCalled();
    expect(replyMock.send).toHaveBeenCalledWith(fakeHouseholds);
  });

  it("should return 404 if household not found", async () => {
    serviceMock.getById.mockResolvedValue(null);

    await controller.getById({ params: { id: 99 } } as any, replyMock);

    expect(replyMock.code).toHaveBeenCalledWith(404);
    expect(replyMock.send).toHaveBeenCalledWith({ message: "Not found" });
  });
});
