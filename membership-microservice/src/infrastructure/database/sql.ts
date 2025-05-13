// src/infrastructure/database/sql.ts

import sql, { ConnectionPool } from "mssql";
import dotenv from "dotenv";

dotenv.config();

let pool: ConnectionPool;

export async function getSqlPool(): Promise<ConnectionPool> {
  if (pool) return pool;

  pool = await new sql.ConnectionPool({
    user: "sa",
    password: "YourStrong!Passw0rd",
    server: "sqlserver",
    port: 1433,
    database: "MembershipDB",
    options: {
      encrypt: false,
      trustServerCertificate: true,
      // instanceName: "SQLEXPRESS",
    },
  }).connect();

  return pool;
}
