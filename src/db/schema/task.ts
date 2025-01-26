import { relations } from 'drizzle-orm';
import {
  uuid,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { userGeneratedGroups } from './group';

// Define enum for task status
export const taskStatusEnum = pgEnum('task_status', [
  'pending',
  'completed',
  'failed',
]);

// Tasks Table
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(), // Use UUID for task ID
  groupId: uuid('groupId'),
  title: varchar('title', { length: 255 }).notNull(), // Task title
  description: text('description'), // Markdown-compatible description
  dueDate: timestamp('due_date').notNull(), // Required due date
  status: taskStatusEnum('status').default('pending').notNull(), // Task status
  isUrgent: boolean('is_urgent').default(false).notNull(), // Urgent flag
  createdAt: timestamp('created_at').defaultNow(), // Auto-populated
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()), // Auto-updated
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  group: one(userGeneratedGroups, {
    fields: [tasks.groupId],
    references: [userGeneratedGroups.id],
  }), // Many-to-many relationship with user-generated groups
}));

export type Tasks = typeof tasks.$inferSelect;
