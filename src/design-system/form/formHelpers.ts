import type { FieldConfig, FormValues } from './types';

export function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.showWhen) return true;
  return values[field.showWhen.field] === field.showWhen.equals;
}

export function isRequired(field: FieldConfig): boolean {
  return field.validations?.some((rule) => rule.type === 'required') ?? false;
}

export function getInitialValues(config: FieldConfig[]): FormValues {
  const values: FormValues = {};
  for (const field of config) {
    values[field.name] = field.type === 'checkbox' ? false : '';
  }
  return values;
}

export function getVisibleValues(config: FieldConfig[], values: FormValues): FormValues {
  const result: FormValues = {};
  for (const field of config) {
    if (isFieldVisible(field, values)) {
      result[field.name] = values[field.name];
    }
  }
  return result;
}
