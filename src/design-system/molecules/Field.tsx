import type { ReactNode } from 'react';
import styles from './Field.module.css';

type FieldProps = {
  id: string;
  label?: string; // checkboxes show their own label, so this is optional
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

// Label on top, then the control, then the hint and the error.
export function Field({ id, label, hint, error, required = false, children }: FieldProps) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}

      {children}

      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
