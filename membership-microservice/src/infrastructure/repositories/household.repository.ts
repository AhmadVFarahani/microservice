// src/infrastructure/repositories/householdRepository.ts

import { injectable } from "tsyringe";
import { IHouseholdRepository } from "../../application/interfaces/ihousehold.Repository";
import sql from "mssql";
import { getSqlPool } from "../database/sql";
import { Household } from "../../domain/entities/household";
import { Member } from "../../domain/entities/member";

@injectable()
export class HouseholdRepository implements IHouseholdRepository {
  async getAll(): Promise<Household[]> {
    const pool = await getSqlPool();
    const result = await pool.request().query("SELECT * FROM Households");
    return result.recordset.map(this.mapToHoushold);
  }

  async getById(id: number): Promise<Household | null> {
    const pool = await getSqlPool();
    const result = await pool.request().input("HouseholdId", id).query(`
      SELECT
        h.Id ,
        h.StreetAddress,
        h.City,
        h.Province,
        h.PostalCode,
        h.Country,
        h.PhoneNumber,
        h.CreatedAt,
        h.UpdatedAt,
        m.Id AS MemberId,
        m.FirstName,
        m.LastName,
        m.DateOfBirth,
        m.Email ,
        m.PhoneNumber AS MemberPhoneNumber,
        m.MembershipType ,
        m.MembershipStartDate ,
        m.MembershipExpiryDate,
        m.CreatedAt AS MemberCreatedAt
        
      FROM Households h
      LEFT JOIN Members m ON h.Id = m.HouseholdId
      WHERE h.Id = @HouseholdId
    `);

    // Check if any records were returned
    return result.recordset.length > 0
      ? this.mapToHousholdWithMembers(result.recordset)
      : null;
  }

  async addMember(member: Member): Promise<void> {
    const pool = await getSqlPool();
    // insert member under household
    const result = await pool
      .request()
      .input("HouseholdId", member.householdId)
      .input("FirstName", member.firstName)
      .input("LastName", member.lastName)
      .input("DateOfBirth", member.dateOfBirth ?? null)
      .input("Email", member.email ?? "")
      .input("PhoneNumber", member.phoneNumber ?? "")
      .input("MembershipType", member.membershipType ?? "")
      .input("MembershipStartDate", member.membershipStartDate ?? "")
      .input("MembershipExpiryDate", member.membershipExpiryDate ?? "").query(`
      INSERT INTO Members (HouseholdId, FirstName, LastName, DateOfBirth, Email, PhoneNumber,MembershipType ,MembershipStartDate, MembershipExpiryDate) 
      VALUES (@HouseholdId, @FirstName, @LastName, @DateOfBirth, @Email, @PhoneNumber,@MembershipType ,@MembershipStartDate, @MembershipExpiryDate);
      SELECT SCOPE_IDENTITY() AS Id;
    `);

    return result.recordset[0].Id;
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
  private mapToHoushold(row: any): Household {
    return new Household(
      row.Id,
      row.StreetAddress,
      row.City,
      row.Province,
      row.PostalCode,
      row.Country,
      row.PhoneNumber,
      row.CreatedAt,
      row.UpdatedAt,
      [],
      row.IsCancelled,
      row.CancelledAt
    );
  }
  private mapToHousholdWithMembers(rows: any): Household {
    const household: Household = this.mapToHoushold(rows[0]);
    for (const member of rows) {
      household.members!.push(
        new Member(
          member.MemberId,
          member.Id,
          member.FirstName ?? "",
          member.LastName ?? "",
          member.DateOfBirth ?? undefined,
          member.MembershipType ?? "",
          member.MembershipStartDate ?? undefined,
          member.MembershipExpiryDate ?? undefined,
          member.Email ?? "",
          member.MemberPhoneNumber ?? "",
          member.MemberCreatedAt ?? undefined,
          member.MemberUpdatedAt ?? undefined
        )
      );
    }

    return household;
  }
}
