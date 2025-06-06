// src/application/interfaces/IHouseholdService.ts

import { HouseholdDto } from "../dto/household-dto";
import { HouseholdCreateCommand } from "../commands/household-create-command";
import { MemberCreateCommand } from "../commands/member-create-command";
import { MemberUpdateCommand } from "../commands/member-update-command";
import { HouseholdUpdateCommand } from "../commands/household-update-command";

export interface IHouseholdService {
  getAll(): Promise<HouseholdDto[]>;
  getById(id: number): Promise<HouseholdDto | null>;
  create(command: HouseholdCreateCommand): Promise<HouseholdDto>;
  cancel(id: number): Promise<void>;
  addMember(householdId: number, command: MemberCreateCommand): Promise<void>;
  updateMember(
    householdId: number,
    command: MemberUpdateCommand
  ): Promise<void>;
  update(id: number, command: HouseholdUpdateCommand): Promise<void>;
}
