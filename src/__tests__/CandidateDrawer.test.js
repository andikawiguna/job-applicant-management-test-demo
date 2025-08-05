import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import CandidateDrawer from '../components/CandidateDrawer';

const mockCandidate = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1-555-0101',
  role: 'Frontend Developer',
  status: 'new',
  resume: 'https://example.com/resume.pdf',
  date: '2024-01-15',
  experience: 3,
  assignee: 'Alice Cooper'
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CandidateDrawer', () => {
  const mockOnClose = jest.fn();
  const mockOnStatusUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders candidate information correctly', () => {
    renderWithTheme(
      <CandidateDrawer
        open={true}
        onClose={mockOnClose}
        candidate={mockCandidate}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@email.com')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('NEW')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Professional Details')).toBeInTheDocument();
    expect(screen.getAllByText('Update Status')).toHaveLength(2); // Header and button
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <CandidateDrawer
        open={true}
        onClose={mockOnClose}
        candidate={mockCandidate}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );

    // Find the close button by its icon
    const closeButton = screen.getByTestId('CloseIcon').closest('button');
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when candidate is null', () => {
    const { container } = renderWithTheme(
      <CandidateDrawer
        open={true}
        onClose={mockOnClose}
        candidate={null}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test('shows success message after status update', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <CandidateDrawer
        open={true}
        onClose={mockOnClose}
        candidate={mockCandidate}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );

    // Select a new status
    await user.click(screen.getByLabelText('Change Status'));
    await user.click(screen.getByText('PROCESSED'));
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /update status/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Status updated successfully!')).toBeInTheDocument();
    });

    expect(mockOnStatusUpdate).toHaveBeenCalledWith(1, 'processed');
  });

  test('displays resume link correctly', () => {
    renderWithTheme(
      <CandidateDrawer
        open={true}
        onClose={mockOnClose}
        candidate={mockCandidate}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );

    const resumeLink = screen.getByText('View Resume');
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink.closest('a')).toHaveAttribute('href', mockCandidate.resume);
  });
});