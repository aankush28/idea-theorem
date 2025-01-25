import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField, SelectField, days, months, years } from './formField';

describe('FormField Component', () => {
  const defaultProps = {
    label: 'Test Field',
    name: 'testField',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  test('renders FormField with label', () => {
    render(<FormField {...defaultProps} />);
    expect(screen.getAllByText('Test Field')[0]).toBeInTheDocument();
  });

  test('shows required asterisk when required prop is true', () => {
    render(<FormField {...defaultProps} required={true} />);
    const asterisks = screen.getAllByText('*');
    expect(asterisks[0]).toBeInTheDocument();
  });

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<FormField {...defaultProps} error={true} helperText={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

describe('SelectField Component', () => {
  const defaultProps = {
    label: 'Select Option',
    name: 'selectField',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    options: ['Option 1', 'Option 2', 'Option 3'],
  };

  test('renders SelectField with label', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getAllByText('Select Option')[0]).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<SelectField {...defaultProps} />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);
    defaultProps.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('shows required asterisk when required prop is true', () => {
    render(<SelectField {...defaultProps} required={true} />);
    const asterisks = screen.getAllByText('*');
    expect(asterisks[0]).toBeInTheDocument();
  });
});

describe('Constants', () => {
  test('days array contains 31 days', () => {
    expect(days).toHaveLength(31);
    expect(days[0]).toBe(1);
    expect(days[30]).toBe(31);
  });

  test('months array contains all 12 months', () => {
    expect(months).toHaveLength(12);
    expect(months[0]).toBe('January');
    expect(months[11]).toBe('December');
  });

  test('years array contains 100 years in descending order', () => {
    const currentYear = new Date().getFullYear();
    expect(years).toHaveLength(100);
    expect(years[0]).toBe(currentYear);
    expect(years[99]).toBe(currentYear - 99);
  });
});
