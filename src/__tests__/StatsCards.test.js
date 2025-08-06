import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import StatsCards from '../components/StatsCards';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockCandidates = [
  { id: 1, status: 'hired', date: '2024-12-15' },
  { id: 2, status: 'rejected', date: '2024-12-10' },
  { id: 3, status: 'new', date: '2024-12-18' },
  { id: 4, status: 'processed', date: '2024-12-05' },
];

describe('StatsCards', () => {
  test('renders all stat cards', () => {
    renderWithTheme(<StatsCards candidates={mockCandidates} />);

    expect(screen.getByText('Total Applicants')).toBeInTheDocument();
    expect(screen.getByText('Hired')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Applied This Week')).toBeInTheDocument();
  });

  test('calculates statistics correctly', () => {
    renderWithTheme(<StatsCards candidates={mockCandidates} />);

    // Check specific stat cards by their labels
    expect(screen.getByText('4')).toBeInTheDocument(); // Total applicants
    expect(screen.getByText('Total Applicants').parentElement.parentElement).toContainElement(screen.getByText('4'));
    expect(screen.getByText('Hired').parentElement.parentElement).toContainElement(screen.getAllByText('1')[0]);
    expect(screen.getByText('Rejected').parentElement.parentElement).toContainElement(screen.getAllByText('1')[1]);
  });

  test('handles empty candidates array', () => {
    renderWithTheme(<StatsCards candidates={[]} />);

    // All stats should show 0
    expect(screen.getAllByText('0')).toHaveLength(4);
  });

  test('handles undefined candidates prop', () => {
    renderWithTheme(<StatsCards />);

    // All stats should show 0
    expect(screen.getAllByText('0')).toHaveLength(4);
  });
});