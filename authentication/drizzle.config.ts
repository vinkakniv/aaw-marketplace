import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const AUTH_DATABASE_URL = process.env.AUTH_DATABASE_URL ?? "postgres://postgres:postgres@localhost:5433/auth-db";

export default {
  schema: './db/schema/*.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: AUTH_DATABASE_URL,
  },
} satisfies Config;