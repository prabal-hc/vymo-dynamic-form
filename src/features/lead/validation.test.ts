import { describe, expect, it } from 'vitest';
import { getInitialValues } from '../../design-system/form/formHelpers';
import { leadFormConfig } from './leadFormConfig';
import { validateForm } from './validation';

const validLead = {
  fullName: 'Priya Sharma',
  email: 'priya@example.com',
  leadType: 'individual',
  companyName: '',
  phone: '9876543210',
  notes: '',
  consent: true,
};

describe('validateForm', () => {
  it('returns no errors for a valid lead', () => {
    expect(validateForm(leadFormConfig, validLead)).toEqual({});
  });

  it('flags every required field on an empty form', () => {
    const errors = validateForm(leadFormConfig, getInitialValues(leadFormConfig));
    expect(Object.keys(errors)).toEqual(['fullName', 'email', 'leadType', 'phone', 'consent']);
  });

  it('checks the email format', () => {
    const errors = validateForm(leadFormConfig, { ...validLead, email: 'priya@' });
    expect(errors.email).toBe('Enter a valid email address');
  });

  it('needs exactly 10 digits for phone', () => {
    expect(validateForm(leadFormConfig, { ...validLead, phone: '12345' }).phone).toBeDefined();
    expect(validateForm(leadFormConfig, { ...validLead, phone: '12345abcde' }).phone).toBeDefined();
  });

  it('limits notes to 200 characters', () => {
    expect(validateForm(leadFormConfig, { ...validLead, notes: 'a'.repeat(200) }).notes).toBeUndefined();
    expect(validateForm(leadFormConfig, { ...validLead, notes: 'a'.repeat(201) }).notes).toBeDefined();
  });

  it('requires company name only when lead type is company', () => {
    expect(validateForm(leadFormConfig, validLead).companyName).toBeUndefined();

    const companyLead = { ...validLead, leadType: 'company' };
    expect(validateForm(leadFormConfig, companyLead).companyName).toBe('Company name is required');
    expect(validateForm(leadFormConfig, { ...companyLead, companyName: 'Acme' })).toEqual({});
  });
});
