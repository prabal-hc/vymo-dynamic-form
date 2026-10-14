import { isFieldVisible } from '../../design-system/form/formHelpers';
import type {
  FieldConfig,
  FieldValue,
  FormErrors,
  FormValues,
  ValidationRule,
} from '../../design-system/form/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmpty(value: FieldValue): boolean {
  if (typeof value === 'boolean') return !value;
  return value.trim() === '';
}

// Returns an error message if the value breaks the rule, otherwise null
function checkRule(rule: ValidationRule, field: FieldConfig, value: FieldValue): string | null {
  if (rule.type === 'required') {
    return isEmpty(value) ? rule.message ?? `${field.label} is required` : null;
  }

  // The other rules only check values that have been filled in
  if (isEmpty(value)) return null;
  const text = String(value).trim();

  if (rule.type === 'email') {
    return EMAIL_REGEX.test(text) ? null : rule.message ?? 'Enter a valid email address';
  }

  if (rule.type === 'pattern') {
    return rule.pattern.test(text) ? null : rule.message;
  }

  if (rule.type === 'maxLength') {
    return text.length <= rule.max
      ? null
      : rule.message ?? `${field.label} must be ${rule.max} characters or fewer`;
  }

  return null;
}

// Takes the config and the current values and returns the errors.
// It does not change anything, so it is easy to test.
// Hidden fields are skipped, so Company name is only required when it is shown.
export function validateForm(config: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) continue;

    for (const rule of field.validations ?? []) {
      const error = checkRule(rule, field, values[field.name]);
      if (error) {
        errors[field.name] = error; // keep only the first error per field
        break;
      }
    }
  }

  return errors;
}
