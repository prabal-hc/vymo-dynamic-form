import styles from './control.module.css';

type TextInputProps = {
  id: string;
  name: string;
  value: string;
  type?: 'text' | 'email';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'numeric' | 'tel';
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function TextInput({
  type = 'text',
  invalid = false,
  describedBy,
  onChange,
  ...rest
}: TextInputProps) {
  const className = invalid ? `${styles.control} ${styles.invalid}` : styles.control;

  return (
    <input
      {...rest}
      type={type}
      className={className}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
