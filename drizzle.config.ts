import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();
 
export default {
    schema: "./src/db/schema.ts",
    driver: 'pg',
    dbCredentials: {
    connectionString: process.env.DB_CONNECTION!,
  }
} satisfies Config;