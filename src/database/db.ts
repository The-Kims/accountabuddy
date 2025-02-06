import { DATABASE_URL } from '@/lib/server/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const client = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(client, { schema });

export { db };
