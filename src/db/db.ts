import { DATABASE_URL } from '@/lib/server/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const client = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(client);

export { db };
