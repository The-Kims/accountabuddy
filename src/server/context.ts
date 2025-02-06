import { db } from '@/database/db';
import { cache } from 'react';

export const createTRPCContextInner = () => {
  return {
    db,
  };
};

/**
 * Creates context for an incoming request
 * Handles scenarios where req or res might be missing.
 * @see https://trpc.io/docs/v11/context
 */
export const createTRPCContext = cache(async () => {
  return {
    db,
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
