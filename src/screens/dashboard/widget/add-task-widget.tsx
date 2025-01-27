import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { TaskForm } from './task-form';

export function AddTaskWidget() {
  return (
    <Card className="w-[350px]  mx-auto  ">
      <CardContent>
        <TaskForm />
      </CardContent>
    </Card>
  );
}
