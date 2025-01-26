import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { userGeneratedGroups, tasks } from '../schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
  // Predefined group names
  const groupNames = ['Urgent', 'Todo', 'In Progress', 'Completed', 'Archived'];

  // Insert groups
  const groupsData = groupNames.map((name) => ({ name }));
  const insertedGroups = await db
    .insert(userGeneratedGroups)
    .values(groupsData)
    .returning({ id: userGeneratedGroups.id });

  console.log('Inserted Groups:', insertedGroups);

  // Number of tasks to create
  const numberOfTasks = 20;

  // Insert tasks
  const tasksData = Array.from({ length: numberOfTasks }).map(() => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    dueDate: faker.date.future(),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
    isUrgent: faker.datatype.boolean(),
    groupId: faker.helpers.arrayElement(insertedGroups).id, // Assign random group to each task
  }));

  const insertedTasks = await db.insert(tasks).values(tasksData);

  console.log('Inserted Tasks:', insertedTasks);
  console.log('Seeding complete!');
};

main().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
