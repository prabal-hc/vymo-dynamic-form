import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from './FormField';
import { getInitialValues, getVisibleValues, isFieldVisible } from './formHelpers';
import type { FieldConfig, FieldValue, FormValues, ValidateFn } from './types';
import styles from './DynamicForm.module.css';

type DynamicFormProps = {
  config: FieldConfig[];
  validate: ValidateFn;
  submitLabel?: string;
  onSubmit: (values: FormValues) => void;
};

export function DynamicForm({ config, validate, submitLabel = 'Submit', onSubmit }: DynamicFormProps) {
  const [values, setValues] = useState<FormValues>(() => getInitialValues(config));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Errors are worked out from the current values on every render
  const errors = validate(config, values);

  // A field shows its error after it has been blurred, or after a submit attempt
  function getError(name: string) {
    if (touched[name] || submitted) return errors[name];
    return undefined;
  }

  function handleChange(name: string, value: FieldValue) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const firstInvalid = config.find((field) => errors[field.name]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid.name}`)?.focus();
      return;
    }

    onSubmit(getVisibleValues(config, values));
  }

  const visibleFields = config.filter((field) => isFieldVisible(field, values));

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {visibleFields.map((field) => (
          <div key={field.name} className={field.width === 'full' ? styles.full : styles.half}>
            <FormField
              field={field}
              id={`field-${field.name}`}
              value={values[field.name]}
              error={getError(field.name)}
              onChange={(value) => handleChange(field.name, value)}
              onBlur={() => handleBlur(field.name)}
            />
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
