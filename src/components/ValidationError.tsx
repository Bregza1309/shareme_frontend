import { FieldError } from 'react-hook-form';

type Props = {
  fieldError: FieldError | undefined;
};

export default function ValidationError({ fieldError }: Props) {
  if (!fieldError) {
    return null;
  }

  return (
    <div role="alert" className="text-red-500 text-l mt-1">
      {fieldError.message}
    </div>
  );
}
