// SERVER COMPONENT
// FOR PRE-FETCHING QUERIES

import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { createCallerFactory } from '@/server/trpc';
import { createTRPCContext } from '@/server/context';
import { makeQueryClient } from '@/server/query-client';
import { appRouter } from '@/server/root';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc: trpcServerPrefetch, HydrateClient } =
  createHydrationHelpers<typeof appRouter>(caller, getQueryClient);
