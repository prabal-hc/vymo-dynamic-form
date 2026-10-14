import { Checkbox } from '../atoms/Checkbox';
import { Select } from '../atoms/Select';
import { TextArea } from '../atoms/TextArea';
import { TextInput } from '../atoms/TextInput';
import { Field } from '../molecules/Field';
import { isRequired } from './formHelpers';
import type { FieldConfig, FieldValue } from './types';

type FormFieldProps = {
  field: FieldConfig;
  id: string;
  value: FieldValue;
  error?: string;
  onChange: (value: FieldValue) => void;
  onBlur: () => void;
};

export function FormField({ field, id, value, error, onChange, onBlur }: FormFieldProps) {
  const required = isRequired(field);

  const describedBy = [field.hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(' ');

  const common = {
    id,
    name: field.name,
    required,
    invalid: Boolean(error),
    describedBy: describedBy || undefined,
    onBlur,
  };

  let control;

  switch (field.type) {
    case 'text':
    case 'email':
      control = (
        <TextInput
          {...common}
          type={field.type}
          value={String(value)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          onChange={onChange}
        />
      );
      break;

    case 'textarea':
      control = (
        <TextArea
          {...common}
          value={String(value)}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
      break;

    case 'select':
      control = (
        <Select
          {...common}
          value={String(value)}
          options={field.options ?? []}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
      break;

    case 'checkbox':
      control = (
        <Checkbox {...common} label={field.label} checked={Boolean(value)} onChange={onChange} />
      );
      break;
  }

  return (
    <Field
      id={id}
      label={field.type === 'checkbox' ? undefined : field.label}
      hint={field.hint}
      error={error}
      required={required}
    >
      {control}
    </Field>
  );
}
