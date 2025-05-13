import { container } from "tsyringe";
import { HouseholdRepository } from "../repositories/household.repository";
import { HouseholdService } from "../../application/services/household.service";
import { IHouseholdRepository } from "../../application/interfaces/ihousehold.Repository";
import { IHouseholdService } from "../../application/interfaces/ihousehold.Service";
import { HouseholdController } from "../../presentation/controllers/household.controller";

// Repository bindings
container.register<IHouseholdRepository>("IHouseholdRepository", {
  useClass: HouseholdRepository,
});
// Service bindings
container.register<IHouseholdService>("IHouseholdService", {
  useClass: HouseholdService,
});

// Controller bindings
container.register<HouseholdController>(HouseholdController, {
    useClass: HouseholdController
});
export { container };
