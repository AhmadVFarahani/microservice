// src/infrastructure/database/sql.ts

import sql, { ConnectionPool } from "mssql";
import dotenv from "dotenv";
import { executeCreateDatabaseCommand, runMigrations } from "./migration";

dotenv.config();
const config = {
  user: "sa",
  password: "YourStrong!Passw0rd",
  server: "sqlserver",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    // instanceName: "SQLEXPRESS",
  },
};

let pool: ConnectionPool;

export async function connectToDatabas(): Promise<void> {
  await connectWithRetry();
}
export async function getSqlPool(): Promise<ConnectionPool> {
  if (pool) return pool;

  pool = await new sql.ConnectionPool({
    ...config,
    database: "MembershipDB",
  }).connect();

  return pool;
}
async function connectWithRetry(
  retries = 5,
  delayMs = 3000
): Promise<ConnectionPool> {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await new sql.ConnectionPool(config).connect();
      await executeCreateDatabaseCommand(conn);
      console.log("✅ Connected to SQL Server");
      return conn;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`❌ Connection attempt ${i + 1} failed: ${err.message}`);
      } else {
        console.error(`❌ Connection attempt ${i + 1} failed:`, err);
      }
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delayMs));
      } else {
        throw err;
      }
    }
  }

  throw new Error("DB connection failed after maximum retries");
}
