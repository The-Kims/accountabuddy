import { taskRouter } from '@/server/routers/tasks';
import { createTRPCRouter } from '@/server/trpc';

export const appRouter = createTRPCRouter({
  taskRouter,
});

export type AppRouter = typeof appRouter;
