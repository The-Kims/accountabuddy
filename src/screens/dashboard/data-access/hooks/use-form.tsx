import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { taskFormSchema } from './schema';
import { z } from 'zod';

const useTaskForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
  });

  // 2. Define a submit handler.
  function handleSubmit(values: z.infer<typeof taskFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return {
    handleSubmit,
    form,
  };
};

export { useTaskForm };
