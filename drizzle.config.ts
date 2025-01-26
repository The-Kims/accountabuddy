import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '@/lib/server/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
