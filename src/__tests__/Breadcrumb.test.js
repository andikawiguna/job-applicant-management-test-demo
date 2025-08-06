import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import Breadcrumb from '../components/Breadcrumb';

const renderWithProviders = (component, initialRoute = '/') => {
  window.history.pushState({}, 'Test page', initialRoute);
  
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Breadcrumb', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders home breadcrumb on root path', () => {
    renderWithProviders(<Breadcrumb />, '/');

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders breadcrumb for list page', () => {
    renderWithProviders(<Breadcrumb />, '/list');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Candidate List')).toBeInTheDocument();
  });

  test('renders breadcrumb for table page', () => {
    renderWithProviders(<Breadcrumb />, '/table');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Table')).toBeInTheDocument();
  });

  test('navigates when home link is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Breadcrumb />, '/list');

    const homeLink = screen.getByText('Home');
    await user.click(homeLink);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('shows current page without link', () => {
    renderWithProviders(<Breadcrumb />, '/list');

    const currentPage = screen.getByText('Candidate List');
    expect(currentPage.closest('a')).toBeNull();
  });
});