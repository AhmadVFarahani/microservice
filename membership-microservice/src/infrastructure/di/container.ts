import { container } from "tsyringe";
import { HouseholdRepository } from "../repositories/household.repository";
import { HouseholdService } from "../../application/services/household.service";
import { IHouseholdRepository } from "../../application/interfaces/ihousehold.Repository";
import { IHouseholdService } from "../../application/interfaces/ihousehold.Service";

// Repository bindings
container.register<IHouseholdRepository>("IHouseholdRepository", {
  useClass: HouseholdRepository,
});
// Service bindings
container.register<IHouseholdService>("IHouseholdService", {
  useClass: HouseholdService,
});

export { container };
