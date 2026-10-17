import { useId } from 'react';

// A single label/input/error association for text fields, selects and textareas.
export default function FormField({
  label,
  id,
  error,
  hint,
  as: Input = 'input',
  className = '',
  ...props
}) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const description = error || hint;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-xs font-semibold text-on-surface mb-1">
        {label}
      </label>
      <Input
        {...props}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={description ? `${fieldId}-description` : undefined}
        className={
          className ||
          'w-full bg-surface-container border border-outline rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:border-primary'
        }
      />
      {description && (
        <p
          id={`${fieldId}-description`}
          role={error ? 'alert' : undefined}
          className={`text-xs mt-1 ${error ? 'text-error' : 'text-on-surface-variant'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
