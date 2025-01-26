import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { userGeneratedGroups } from './group';
import { relations } from 'drizzle-orm';
import { tasks } from './task';

// GroupTasks Table (Join Table for Many-to-Many Relationship)
export const groupTasks = pgTable(
  'group_tasks',
  {
    groupId: uuid('group_id')
      .notNull()
      .references(() => userGeneratedGroups.id, { onDelete: 'cascade' }), // Foreign key to user_generated_groups
    taskId: uuid('task_id')
      .notNull()
      .references(() => tasks.id, { onDelete: 'cascade' }), // Foreign key to tasks
  },
  (t) => [
    primaryKey({ columns: [t.groupId, t.taskId] }), // Composite primary key
  ]
);

// GroupTasks Relations
export const groupTasksRelations = relations(groupTasks, ({ one }) => ({
  group: one(userGeneratedGroups, {
    fields: [groupTasks.groupId],
    references: [userGeneratedGroups.id],
  }),
  task: one(tasks, {
    fields: [groupTasks.taskId],
    references: [tasks.id],
  }),
}));

export type GroupTasks = typeof groupTasks.$inferSelect;
