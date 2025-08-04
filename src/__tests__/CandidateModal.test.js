import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import CandidateModal from '../components/CandidateModal';

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

describe('CandidateModal', () => {
  test('renders candidate information correctly', () => {
    renderWithTheme(
      <CandidateModal open={true} onClose={jest.fn()} candidate={mockCandidate} />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@email.com')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClose = jest.fn();
    renderWithTheme(
      <CandidateModal open={true} onClose={mockOnClose} candidate={mockCandidate} />
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when candidate is null', () => {
    const { container } = renderWithTheme(
      <CandidateModal open={true} onClose={jest.fn()} candidate={null} />
    );

    expect(container.firstChild).toBeNull();
  });
});