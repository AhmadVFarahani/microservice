// src/infrastructure/database/migration.ts

import { getSqlPool } from "./sql";
export async function executeCreateDatabaseCommand(pool: any) {
  // Example: Create Households table if not exists
  await pool.request().query(`
    IF NOT EXISTS (
      SELECT name FROM sys.databases WHERE name = N'MembershipDB'
    )
    BEGIN
      CREATE DATABASE [MembershipDB];
    END
  `);
}

export async function runMigrations() {
  const pool = await getSqlPool();

  // Example: Create Households table if not exists
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Households' AND xtype='U')
    CREATE TABLE Households (
      Id INT IDENTITY(1,1) PRIMARY KEY,
      StreetAddress NVARCHAR(255) NOT NULL,
      City NVARCHAR(100) NOT NULL,
      Province NVARCHAR(10) NOT NULL,
      PostalCode NVARCHAR(10) NOT NULL,
      Country NVARCHAR(50) NOT NULL,
      PhoneNumber NVARCHAR(20),
      IsCancelled BIT NOT NULL DEFAULT 0,
      CancelledAt DATETIME NULL,
      CreatedAt DATETIME DEFAULT GETDATE(),
      UpdatedAt DATETIME DEFAULT GETDATE()
    );
  `);
  // ✅ Create Members table if not exists
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Members' AND xtype='U')
    CREATE TABLE Members (
      Id INT IDENTITY(1,1) PRIMARY KEY,
      HouseholdId INT NOT NULL FOREIGN KEY REFERENCES Households(Id),
      FirstName NVARCHAR(100) NOT NULL,
      LastName NVARCHAR(100) NOT NULL,
      DateOfBirth DATETIME NOT NULL,
      MembershipType NVARCHAR(20) NOT NULL,
      MembershipStartDate DATETIME NOT NULL,
      MembershipExpiryDate DATETIME NOT NULL,
      Email NVARCHAR(255),
      PhoneNumber NVARCHAR(20),
      CreatedAt DATETIME DEFAULT GETDATE(),
      UpdatedAt DATETIME DEFAULT GETDATE()
    );
  `);
  console.log("✅ Database migration completed");
}
