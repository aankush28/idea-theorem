import { getHelperText } from './getHelperText';
import { render } from '@testing-library/react';

describe('getHelperText Utility', () => {
  // Required field validation
  test('should show required message when field is touched but empty', () => {
    const formData = { fullName: '' };
    const touched = { fullName: true };
    const { container } = render(getHelperText('fullName', formData, touched));
    expect(container).toHaveTextContent('Full Name is required');
  });

  // Full Name validation
  test('should validate full name contains only letters and spaces', () => {
    const formData = { fullName: 'Manoj123' };
    const touched = { fullName: true };
    const { container } = render(getHelperText('fullName', formData, touched));
    expect(container).toHaveTextContent('Full Name cannot contain symbols and cannot be empty');
  });

  // Email validation
  test('should validate email format', () => {
    const formData = { email: 'invalid-email' };
    const touched = { email: true };
    const { container } = render(getHelperText('email', formData, touched));
    expect(container).toHaveTextContent('Sorry, this email address is not valid');
  });

  // Contact Number validation
  test('should validate contact number format', () => {
    const formData = { contactNumber: '123abc4567' };
    const touched = { contactNumber: true };
    const { container } = render(getHelperText('contactNumber', formData, touched));
    expect(container).toHaveTextContent('Contact number must be 10 digits long');
  });

  // Password validation
  test('should validate password requirements', () => {
    const formData = { password: 'weakpass' };
    const touched = { password: true };
    const { container } = render(getHelperText('password', formData, touched));
    expect(container).toHaveTextContent('Password must be at least 8 characters long');
  });

  // Confirm Password validation
  test('should validate password match', () => {
    const formData = { password: 'StrongPass123!', confirmPassword: 'DifferentPass123!' };
    const touched = { confirmPassword: true };
    const { container } = render(getHelperText('confirmPassword', formData, touched));
    expect(container).toHaveTextContent('Confirm password must match the password');
  });

  // Valid input cases
  test('should return empty string for valid inputs', () => {
    const validFormData = {
      fullName: 'Manoj Gupta',
      email: 'manoj@example.com',
      contactNumber: '9876543210',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!'
    };
    const touched = { fullName: true };
    
    expect(getHelperText('fullName', validFormData, touched)).toBe('');
  });
});
