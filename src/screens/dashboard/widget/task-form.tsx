'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTaskForm } from '../data-access/hooks/use-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { DatePickerDemo } from '@/components/date-picker';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { GroupTask } from './group-tasks';

const TaskForm = () => {
  const { form, handleSubmit } = useTaskForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 pt-6 ">
        <div className="flex gap-10 ">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePickerDemo date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <GroupTask />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your task.." id="message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline">Cancel</Button>
        <Button type="submit" className="ml-2">
          Save
        </Button>
      </form>
    </Form>
  );
};

export { TaskForm };
