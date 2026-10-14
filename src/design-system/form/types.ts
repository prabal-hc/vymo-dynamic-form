import type { SelectOption } from '../atoms/Select';

export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox';

export type FieldValue = string | boolean;
export type FormValues = Record<string, FieldValue>;
export type FormErrors = Record<string, string>;

export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'pattern'; pattern: RegExp; message: string }
  | { type: 'maxLength'; max: number; message?: string };

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'numeric' | 'tel';
  options?: SelectOption[]; // only for "select"
  validations?: ValidationRule[];
  // Show this field only when another field has a certain value
  showWhen?: { field: string; equals: FieldValue };
  // On desktop: "half" takes one of the two columns, "full" takes the whole row
  width?: 'half' | 'full';
};

// Any function that takes the config and the values and returns errors
export type ValidateFn = (config: FieldConfig[], values: FormValues) => FormErrors;
