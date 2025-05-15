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

  cancel = async (req: FastifyRequest, reply: FastifyReply) => {
    const id = Number((req.params as any).id);
    await this.service.cancel(id);
    reply.status(204).send();
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
