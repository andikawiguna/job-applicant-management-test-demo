import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import StatusChangeForm from '../components/StatusChangeForm';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StatusChangeForm', () => {
  const mockOnStatusChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with available status options', () => {
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
      />
    );

    expect(screen.getByLabelText('Change Status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update status/i })).toBeInTheDocument();
  });

  test('excludes current status from options', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
      />
    );

    await user.click(screen.getByLabelText('Change Status'));
    
    expect(screen.getByText('PROCESSED')).toBeInTheDocument();
    expect(screen.getByText('REJECTED')).toBeInTheDocument();
    expect(screen.getByText('HIRED')).toBeInTheDocument();
    expect(screen.queryByText('NEW')).not.toBeInTheDocument();
  });

  test('shows validation error when no status selected', () => {
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
      />
    );

    // Button should be disabled when no status is selected
    const updateButton = screen.getByRole('button', { name: /update status/i });
    expect(updateButton).toBeDisabled();
  });

  test('calls onStatusChange with selected status', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
      />
    );

    await user.click(screen.getByLabelText('Change Status'));
    await user.click(screen.getByText('PROCESSED'));
    await user.click(screen.getByRole('button', { name: /update status/i }));

    expect(mockOnStatusChange).toHaveBeenCalledWith('processed');
  });

  test('displays error message when provided', () => {
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
        error="Failed to update status"
      />
    );

    expect(screen.getByText('Failed to update status')).toBeInTheDocument();
  });

  test('shows loading state when loading', () => {
    renderWithTheme(
      <StatusChangeForm
        currentStatus="new"
        onStatusChange={mockOnStatusChange}
        loading={true}
      />
    );

    expect(screen.getByRole('button', { name: /updating/i })).toBeInTheDocument();
  });
});