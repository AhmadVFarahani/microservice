// src/presentation/controllers/household.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { container, injectable } from "tsyringe";
import {
  HouseholdCreateCommand,
  validateHouseholdCreate,
} from "../../application/commands/household-create-command";
import {
  MemberCreateCommand,
  validateMemberCreate,
} from "../../application/commands/member-create-command";

import { IHouseholdService } from "../../application/interfaces/ihousehold.Service";
import {
  MemberUpdateCommand,
  validateMemberUpdate,
} from "../../application/commands/member-update-command";
import {
  HouseholdUpdateCommand,
  validateHouseholdUpdateCommand,
} from "../../application/commands/household-update-command";

@injectable()
export class HouseholdController {
  private service: IHouseholdService;

  constructor() {
    this.service = container.resolve<IHouseholdService>("IHouseholdService");
  }

  getAll = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await this.service.getAll();
    reply.send(result);
  };

  getById = async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    const result = await this.service.getById(id);
    if (!result) return reply.code(404).send({ message: "Not found" });
    reply.send(result);
  };

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const command = req.body as HouseholdCreateCommand;

    // ✅ VALIDATION
    if (!validateHouseholdCreate(command)) {
      return reply.status(400).send({
        message: "Validation error",
        errors: validateHouseholdCreate.errors,
      });
    }

    const result = await this.service.create(command);
    reply.send(result);
  };

  update = async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    const command = req.body as HouseholdUpdateCommand;

    // ✅ VALIDATION
    if (!validateHouseholdCreate(command)) {
      return reply.status(400).send({
        message: "Validation error",
        errors: validateHouseholdUpdateCommand.errors,
      });
    }

    try {
      await this.service.update(id, command);
      reply.status(204).send();
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Unexpected error" });
    }
  };

  cancel = async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    await this.service.cancel(id);
    reply.status(204).send();
  };

  // ✅ UPDATE MEMBER
  updateMember = async (req: FastifyRequest, reply: FastifyReply) => {
    const householdId = Number((req.params as any).householdId);
    const body = req.body as MemberUpdateCommand;
    const command: MemberUpdateCommand = {
      ...body,
      householdId: householdId,
    };

    // ✅ VALIDATION
    if (!validateMemberUpdate(command)) {
      return reply.status(400).send({
        message: "Validation error",
        errors: validateMemberUpdate.errors,
      });
    }

    const parsedCommand = {
      ...command,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      membershipStartDate: body.membershipStartDate
        ? new Date(body.membershipStartDate)
        : undefined,
      membershipExpiryDate: body.membershipExpiryDate
        ? new Date(body.membershipExpiryDate)
        : undefined,
    };

    try {
      await this.service.updateMember(Number(householdId), parsedCommand);
      reply.status(204).send();
    } catch (err) {
      if (err instanceof Error && err.message.includes("not found")) {
        return reply.status(404).send({ message: err.message });
      }

      console.error(err);
      return reply.status(500).send({ message: "Unexpected error" });
    }
  };

  addMember = async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    const body = req.body as MemberCreateCommand;

    const command: MemberCreateCommand = {
      ...body,
      householdId: id,
    };

    // ✅ VALIDATION
    if (!validateMemberCreate(command)) {
      return reply.status(400).send({
        message: "Validation error",
        errors: validateMemberCreate.errors,
      });
    }

    await this.service.addMember(id, {
      ...command,
      dateOfBirth: new Date(command.dateOfBirth),
      membershipStartDate: new Date(command.membershipStartDate),
      membershipExpiryDate: new Date(command.membershipExpiryDate),
    });

    reply.status(204).send();
  };
}
