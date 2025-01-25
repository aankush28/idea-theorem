import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';

const theme = createTheme();

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
  };

  test('renders header component', () => {
    renderHeader();
    const headerElement = screen.getByRole('img', { name: /logo/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('applies desktop classes when not mobile', () => {
    renderHeader();
    const headerContainer = screen.getByRole('img').parentElement;
    expect(headerContainer).toHaveClass('header-desktop');
  });

  test('logo has correct attributes', () => {
    renderHeader();
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('src', 'logo.svg');
    expect(logoElement).toHaveAttribute('alt', 'logo');
    expect(logoElement).toHaveClass('logo');
  });
});
