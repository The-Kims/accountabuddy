import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/server/trpc'; // Adjust based on your setup
import { tasks } from '@/db/schema/task'; // Adjust path
import { eq } from 'drizzle-orm';

export const taskRouter = createTRPCRouter({
  // Create a new task
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string().uuid(),
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        dueDate: z.string().transform((val) => new Date(val)),
        status: z.enum(['pending', 'completed', 'failed']).optional(), // TODO: infer on drizzle ORM
      })
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db
        .insert(tasks)
        .values({
          groupId: input.groupId,
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          status: input.status ?? 'pending',
        })
        .returning();
      return task[0];
    }),

  // Get all tasks
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(tasks);
  }),

  // Get a task by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(tasks).where(eq(tasks.id, input.id));
    }),

  // Update a task
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        dueDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
        status: z.enum(['pending', 'completed', 'failed']).optional(),
        isUrgent: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      const updatedTask = await ctx.db
        .update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();
      return updatedTask[0];
    }),

  // Delete a task
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tasks).where(eq(tasks.id, input.id));
      return { success: true };
    }),
});

export type TaskRouter = typeof taskRouter;
