import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { userGeneratedGroups, tasks, groupTasks } from '../schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
  const groupNames = ['Urgent', 'Todo', 'In Progress', 'Completed', 'Archived'];

  const groupsData = groupNames.map((name) => ({
    name,
  }));

  const insertedGroups = await db
    .insert(userGeneratedGroups)
    .values(groupsData)
    .returning({ id: userGeneratedGroups.id });

  const numberOfTasks = 20;

  const tasksData = Array.from({ length: numberOfTasks }).map(() => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    dueDate: faker.date.future(),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
    isUrgent: faker.datatype.boolean(),
  }));

  const insertedTasks = await db
    .insert(tasks)
    .values(tasksData)
    .returning({ id: tasks.id });

  const groupTasksData = insertedTasks.flatMap((task) => {
    const groupsForTask = faker.helpers.arrayElements(
      insertedGroups,
      faker.number.int({ min: 1, max: 3 })
    );
    return groupsForTask.map((group) => ({
      groupId: group.id,
      taskId: task.id,
    }));
  });

  await db.insert(groupTasks).values(groupTasksData);

  console.log('Seeding complete!');
};

main().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
