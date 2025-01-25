import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AlertMessage from './AlertMessage';

describe('AlertMessage Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renders error message with cross icon', () => {
    const onClose = jest.fn();
    act(() => {
      render(<AlertMessage error="Error occurred" onClose={onClose} />);
    });
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    const crossIcon = screen.getByRole('alert').querySelector('svg');
    expect(crossIcon).toBeInTheDocument();
  });

  test('renders success message with checkmark icon', () => {
    const onClose = jest.fn();
    act(() => {
      render(<AlertMessage success="Operation successful" onClose={onClose} />);
    });
    
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    const checkIcon = screen.getByRole('alert').querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  test('disappears after 2.5 seconds', () => {
    const onClose = jest.fn();
    act(() => {
      render(<AlertMessage success="Operation successful" onClose={onClose} />);
    });
    
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    
    expect(onClose).toHaveBeenCalled();
  });

  test('does not render when no error or success prop is provided', () => {
    const onClose = jest.fn();
    render(<AlertMessage onClose={onClose} />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('applies mobile styles when isMobile prop is true', () => {
    const onClose = jest.fn();
    act(() => {
      render(<AlertMessage success="Success" isMobile={true} onClose={onClose} />);
    });
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ width: '85%' });
  });
});
