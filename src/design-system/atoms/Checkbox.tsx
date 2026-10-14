import styles from './Checkbox.module.css';

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
};

export function Checkbox({
  label,
  invalid = false,
  required = false,
  describedBy,
  onChange,
  ...rest
}: CheckboxProps) {
  return (
    <label className={styles.wrapper}>
      <input
        {...rest}
        type="checkbox"
        className={styles.box}
        required={required}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </span>
    </label>
  );
}
