// src/infrastructure/repositories/householdRepository.ts

import { injectable } from "tsyringe";
import { IHouseholdRepository } from "../../application/interfaces/iHouseholdRepository";
import sql from "mssql";
import { getSqlPool } from "../database/sql";
import { Household } from "../../domain/entities/household";

@injectable()
export class HouseholdRepository implements IHouseholdRepository {
  async getAll(): Promise<Household[]> {
    const pool = await getSqlPool();
    const result = await pool.request().query("SELECT * FROM Households");
    return result.recordset.map(this.mapToEntity);
  }

  async getById(id: number): Promise<Household | null> {
    const pool = await getSqlPool();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query("SELECT * FROM Households WHERE Id = @Id");

    return result.recordset.length > 0
      ? this.mapToEntity(result.recordset[0])
      : null;
  }

  async save(household: Household): Promise<Household> {
    const pool = await getSqlPool();
    const result = await pool
      .request()
      .input("StreetAddress", sql.NVarChar(255), household.streetAddress)
      .input("City", sql.NVarChar(100), household.city)
      .input("Province", sql.NVarChar(10), household.province)
      .input("PostalCode", sql.NVarChar(10), household.postalCode)
      .input("Country", sql.NVarChar(50), household.country)
      .input("PhoneNumber", sql.NVarChar(20), household.phoneNumber ?? null)
      .query(`
        INSERT INTO Households 
        (StreetAddress, City, Province, PostalCode, Country, PhoneNumber, IsCancelled, CancelledAt)
        VALUES (@StreetAddress, @City, @Province, @PostalCode, @Country, @PhoneNumber, 0, NULL);
        SELECT SCOPE_IDENTITY() AS Id;
      `);

    household.id = result.recordset[0].Id;
    return household;
  }

  async update(household: Household): Promise<void> {
    const pool = await getSqlPool();
    await pool
      .request()
      .input("Id", sql.Int, household.id)
      .input("StreetAddress", sql.NVarChar(255), household.streetAddress)
      .input("City", sql.NVarChar(100), household.city)
      .input("Province", sql.NVarChar(10), household.province)
      .input("PostalCode", sql.NVarChar(10), household.postalCode)
      .input("Country", sql.NVarChar(50), household.country)
      .input("PhoneNumber", sql.NVarChar(20), household.phoneNumber ?? null)
      .input("IsCancelled", sql.Bit, household.isCancelled ? 1 : 0)
      .input("CancelledAt", sql.DateTime, household.cancelledAt ?? null).query(`
        UPDATE Households SET 
          StreetAddress = @StreetAddress,
          City = @City,
          Province = @Province,
          PostalCode = @PostalCode,
          Country = @Country,
          PhoneNumber = @PhoneNumber,
          IsCancelled = @IsCancelled,
          CancelledAt = @CancelledAt
        WHERE Id = @Id
      `);
  }

  // Helper: DB row → Entity
  private mapToEntity(row: any): Household {
    return new Household(
      row.Id,
      row.StreetAddress,
      row.City,
      row.Province,
      row.PostalCode,
      row.Country,
      row.PhoneNumber,
      row.CreatedAt,
      row.UpdatedAt
    );
  }
}
