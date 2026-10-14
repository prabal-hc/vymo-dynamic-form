import styles from './control.module.css';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function Select({
  options,
  placeholder = 'Select an option',
  invalid = false,
  describedBy,
  onChange,
  ...rest
}: SelectProps) {
  const className = invalid ? `${styles.control} ${styles.invalid}` : styles.control;

  return (
    <select
      {...rest}
      className={className}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
