// src/application/services/HouseholdService.ts

import { inject, injectable } from "tsyringe";
import { HouseholdDto } from "../dto/household-dto";
import { HouseholdCreateCommand } from "../commands/household-create-command";
import { IHouseholdService } from "../interfaces/ihousehold.Service";
import { IHouseholdRepository } from "../interfaces/ihousehold.Repository";
import { Household } from "../../domain/entities/household";
import { Member } from "../../domain/entities/member";
import { MemberCreateCommand } from "../commands/member-create-command";
import { MemberUpdateCommand } from "../commands/member-update-command";

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
    const householdDto = household ? this.mapToDto(household) : null;

    return householdDto;
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

  async updateMember(
    householdId: number,
    command: MemberUpdateCommand
  ): Promise<void> {
    const household = await this.repository.getById(householdId);
    if (!household) throw new Error("Household not found");

    const member = household.members.find((m) => m.id === command.memberId);
    if (!member) throw new Error("Member not found");

    if (command.firstName) member.firstName = command.firstName;
    if (command.lastName) member.lastName = command.lastName;
    if (command.dateOfBirth) member.dateOfBirth = command.dateOfBirth;
    if (command.membershipType) member.membershipType = command.membershipType;
    if (command.membershipStartDate)
      member.membershipStartDate = command.membershipStartDate;
    if (command.membershipExpiryDate)
      member.membershipExpiryDate = command.membershipExpiryDate;
    if (command.email) member.email = command.email;
    if (command.phoneNumber) member.phoneNumber = command.phoneNumber;

    await this.repository.updateMember(member);
  }

  async addMember(
    householdId: number,
    command: MemberCreateCommand
  ): Promise<void> {
    const household = await this.repository.getById(householdId);
    if (!household) {
      throw new Error(`Household with ID ${householdId} not found`);
    }

    const newMember = new Member(
      null,
      householdId,
      command.firstName,
      command.lastName,
      command.dateOfBirth,
      command.membershipType,
      command.membershipStartDate,
      command.membershipExpiryDate,
      command.email,
      command.phoneNumber
    );

    household.addMember(newMember);

    await this.repository.addMember(newMember);
  }

  // Helper to map entity → DTO

  private mapToDto(h: Household): HouseholdDto {
    const householdDto = {
      id: h.id,
      streetAddress: h.streetAddress,
      city: h.city,
      province: h.province,
      postalCode: h.postalCode,
      country: h.country,
      phoneNumber: h.phoneNumber,
      isCancelled: h.isCancelled,
      cancelledAt: h.cancelledAt ?? null,
      createdAt: h.createdAt!,
      members: h.getMembers().map((member) => ({
        id: member.id,
        householdId: member.householdId,
        firstName: member.firstName,
        lastName: member.lastName,
        dateOfBirth: member.dateOfBirth,
        membershipType: member.membershipType,
        membershipStartDate: member.membershipStartDate,
        membershipExpiryDate: member.membershipExpiryDate,
        email: member.email,
        phoneNumber: member.phoneNumber,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      })),
    };

    return householdDto;
  }
}
