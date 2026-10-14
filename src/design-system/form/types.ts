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
  options?: SelectOption[];
  validations?: ValidationRule[];
  showWhen?: { field: string; equals: FieldValue };
  width?: 'half' | 'full';
};

export type ValidateFn = (config: FieldConfig[], values: FormValues) => FormErrors;
