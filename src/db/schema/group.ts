import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { tasks } from './task';

// UserGeneratedGroups Table (formerly "groups")
export const userGeneratedGroups = pgTable('user_generated_groups', {
  id: uuid('id').primaryKey().defaultRandom(), // Use UUID for group ID
  name: varchar('name', { length: 255 }).notNull(), // Group name
  createdAt: timestamp('created_at').defaultNow(), // Auto-populated
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()), // Auto-updated
});

// UserGeneratedGroups Relations
export const userGeneratedGroupsRelations = relations(
  userGeneratedGroups,
  ({ many }) => ({
    tasks: many(tasks), // Many-to-many relationship with tasks
  })
);

export type UserGeneratedGroups = typeof userGeneratedGroups.$inferSelect;
