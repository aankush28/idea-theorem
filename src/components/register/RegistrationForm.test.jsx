import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import { createUserAPI } from '../../utils/api';

jest.mock('../../utils/api');

const theme = createTheme();

const customRender = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('RegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillDateSelects = async () => {
    const daySelect = screen.getByLabelText(/Day/i);
    const monthSelect = screen.getByLabelText(/Month/i);
    const yearSelect = screen.getByLabelText(/Year/i);

    fireEvent.mouseDown(daySelect);
    const dayOption = await screen.findByText('1');
    fireEvent.click(dayOption);

    fireEvent.mouseDown(monthSelect);
    const monthOption = await screen.findByText('January');
    fireEvent.click(monthOption);

    fireEvent.mouseDown(yearSelect);
    const yearOption = await screen.findByText('1990');
    fireEvent.click(yearOption);
  };

  test('submits form with valid data successfully', async () => {
    createUserAPI.mockResolvedValueOnce({ status: 200 });
    customRender(<RegistrationForm />);

    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Manoj Gupta');
    await userEvent.type(screen.getByLabelText(/Contact Number/i), '9876543210');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'manoj@example.com');
    
    await fillDateSelects();

    await userEvent.type(screen.getByLabelText(/Create Password/i), 'Manoj123!@#');
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'Manoj123!@#');

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('User account successfully created.')).toBeInTheDocument();
    });
  });

  test('handles API error during form submission', async () => {
    createUserAPI.mockRejectedValueOnce(new Error('API Error'));
    customRender(<RegistrationForm />);

    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Manoj Gupta');
    await userEvent.type(screen.getByLabelText(/Contact Number/i), '9876543210');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'manoj@example.com');
    
    await fillDateSelects();

    await userEvent.type(screen.getByLabelText(/Create Password/i), 'Manoj123!@#');
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'Manoj123!@#');

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('There was an error creating the account.')).toBeInTheDocument();
    });
  });

  test('validates password match', async () => {
    customRender(<RegistrationForm />);

    // Fill in all required fields first
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/Contact Number/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'test@example.com');
    
    // Fill date fields
    await fillDateSelects();

    // Fill passwords with mismatched values
    const createPasswordInput = screen.getByLabelText(/Create Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    
    await userEvent.type(createPasswordInput, 'Test123!@#');
    await userEvent.type(confirmPasswordInput, 'Different123!@#');
    
    // Trigger validation
    fireEvent.blur(confirmPasswordInput);
    fireEvent.click(screen.getByText('Submit'));

    // Look for error message in helperText
    await waitFor(() => {
        const errorElements = screen.getAllByText((content, element) => {
            return content.includes('Passwords do not match');
        });
        expect(errorElements.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
});


});
