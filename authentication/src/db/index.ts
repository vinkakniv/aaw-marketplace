import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const AUTH_DATABASE_URL = process.env.AUTH_DATABASE_URL ?? "postgres://postgres:postgres@localhost:5433/auth-db";

export const pool = new Pool({
  connectionString: AUTH_DATABASE_URL,
});

export const db = drizzle(pool);
