import { validateForm } from './validation';

describe('Form Validation Tests', () => {
  // Full Name Tests
  test('validates full name correctly', () => {
    expect(validateForm({ fullName: 'Manoj Gupta' })).toBeNull();
    expect(validateForm({ fullName: '' })).toBe('Full Name is required.');
    expect(validateForm({ fullName: 'Manoj123' })).toBe('Full Name cannot contain symbols and cannot be empty.');
  });

  // Contact Number Tests
  test('validates contact number correctly', () => {
    expect(validateForm({ contactNumber: '9876543210' })).toBeNull();
    expect(validateForm({ contactNumber: '' })).toBe('Contact Number is required.');
    expect(validateForm({ contactNumber: '123456' })).toBe('Contact Number must be in Canadian format (10 digits).');
  });

  // Email Tests
  test('validates email correctly', () => {
    expect(validateForm({ email: 'test@example.com' })).toBeNull();
    expect(validateForm({ email: '' })).toBe('Email is required.');
    expect(validateForm({ email: 'invalid-email' })).toBe('Invalid email address.');
  });

  // Date of Birth Tests
  test('validates date of birth correctly', () => {
    expect(validateForm({ day: '1', month: '1', year: '2000' })).toBeNull();
    expect(validateForm({ day: '', month: '', year: '' })).toBe('Date of Birth is required.');
    expect(validateForm({ day: '31', month: '12', year: '2025' })).toBe('Date of Birth must be a valid past date.');
  });

  // Password Tests
  test('validates password correctly', () => {
    expect(validateForm({ password: 'Manoj123!@#' })).toBeNull();
    expect(validateForm({ password: '' })).toBe('Password is required.');
    expect(validateForm({ password: 'weak' })).toBe('Password must be at least 8 characters long and include a number and a special character.');
  });

  // Confirm Password Tests
  test('validates password confirmation correctly', () => {
    expect(validateForm({ password: 'Manoj123!@#', confirmPassword: 'Manoj123!@#' })).toBeNull();
    expect(validateForm({ password: 'Manoj123!@#', confirmPassword: 'ManojG123!@#' })).toBe('Passwords do not match.');
  });

  // Complete Form Test
  test('validates complete form data correctly', () => {
    const validFormData = {
      fullName: 'Manoj Gupta',
      contactNumber: '9876543210',
      email: 'Manoj@example.com',
      day: '1',
      month: '1',
      year: '2000',
      password: 'Manoj123!@#',
      confirmPassword: 'Manoj123!@#'
    };
    expect(validateForm(validFormData)).toBeNull();
  });
});
