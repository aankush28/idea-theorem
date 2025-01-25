import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ActionButton } from './ActionButton';

describe('ActionButton Component', () => {
  test('renders button with default props', () => {
    render(<ActionButton label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', undefined);
    expect(button).toHaveClass('MuiButton-contained');
  });

  test('renders button with custom variant', () => {
    render(<ActionButton label="Click me" variant="outlined" />);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<ActionButton label="Click me" onClick={handleClick} />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies fullWidth style when isMobile is true', () => {
    render(<ActionButton label="Click me" isMobile={true} />);
    const button = screen.getByText('Click me');
    expect(button).toHaveStyle({ width: '100%' });
  });

  test('renders button with custom type', () => {
    render(<ActionButton label="Submit" type="submit" />);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('applies custom colors', () => {
    render(
      <ActionButton 
        label="Styled Button" 
        backgroundColor="#ff0000"
        borderColor="#000000"
        textColor="#ffffff"
      />
    );
    const button = screen.getByText('Styled Button');
    expect(button).toBeInTheDocument();
  });
});
