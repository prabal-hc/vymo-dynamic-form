import styles from './control.module.css';

type TextAreaProps = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function TextArea({ invalid = false, describedBy, onChange, ...rest }: TextAreaProps) {
  let className = `${styles.control} ${styles.textarea}`;
  if (invalid) className += ` ${styles.invalid}`;

  return (
    <textarea
      {...rest}
      className={className}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
