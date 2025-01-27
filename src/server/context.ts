import { db } from '@/db/db';

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
export const createTRPCContext = () => {
  return {
    db,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
