import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  // if (!opts.ctx.session?.user?.email) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //   });
  // }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      ...opts.ctx,
    },
  });
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
