import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../theme/theme';
import CandidateList from '../pages/CandidateList';
import { fetchCandidates } from '../services/api';

// Mock the API service
jest.mock('../services/api', () => ({
  fetchCandidates: jest.fn(),
}));


const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component) => {
  const queryClient = createTestQueryClient();
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('CandidateList', () => {
  beforeEach(() => {
    fetchCandidates.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          role: 'Developer',
          status: 'new',
          date: '2024-01-15'
        }
      ],
      total: 1,
      totalPages: 1
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state initially', () => {
    renderWithProviders(<CandidateList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});