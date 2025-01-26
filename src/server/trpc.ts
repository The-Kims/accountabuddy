import { db } from '@/db/db';
import { initTRPC } from '@trpc/server';
import { type NextRequest } from 'next/server';

interface CreateContextOptions {
  headers: Headers;
}

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure;
export const createTRPCRouter = t.router;

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
    db,
  };
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};
