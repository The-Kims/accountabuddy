import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

type InputRequiredProps = {
  title: string;
};

export default function InputRequired() {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Input with error</Label>
      <Input
        id={id}
        className="border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
        placeholder="Email"
        type="email"
        defaultValue="invalid@email.com"
      />
      <p
        className="mt-2 text-xs text-destructive"
        role="alert"
        aria-live="polite">
        Email is invalid
      </p>
    </div>
  );
}
