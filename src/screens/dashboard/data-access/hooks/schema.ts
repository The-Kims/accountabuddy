'use client';

import { z } from 'zod';

export const taskFormSchema = z
  .object({
    title: z
      .string({
        required_error: 'Must have a title',
      })
      .min(1)
      .max(50),
    description: z.string().optional(),
    dueDate: z.date({
      required_error: 'Due date is required',
    }),
    group: z.string().optional().default('To Do'),
  })
  .strip();
