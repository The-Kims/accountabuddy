import { DATABASE_URL } from '@/lib/server/env';
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(DATABASE_URL);

export { db };
