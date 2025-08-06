import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Pagination,
} from '@mui/material';
import { useAllCandidates } from '../hooks/useCandidates';
import { getStatusColor, formatDate } from '../utils/statusColors';
import { useStore } from '../store/useStore';
import CandidateDrawer from '../components/CandidateDrawer';
import SearchAndFilter from '../components/SearchAndFilter';
import StatsCards from '../components/StatsCards';
import Breadcrumb from '../components/Breadcrumb';

/**
 * Table view for displaying candidates with sorting functionality
 */
const CandidateTable = () => {
  const { currentPage, setCurrentPage } = useStore();
  const [page, setPage] = useState(currentPage.table);
  
  useEffect(() => {
    setCurrentPage('table', page);
  }, [page, setCurrentPage]);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({});
  
  const { data: allCandidates, isLoading, error } = useAllCandidates();

  // Handle sorting with 3-state cycle: none -> asc -> desc -> none
  const handleSort = (property) => {
    if (orderBy !== property) {
      // First click on new column: set to ascending
      setOrder('asc');
      setOrderBy(property);
    } else if (order === 'asc') {
      // Second click: set to descending
      setOrder('desc');
    } else {
      // Third click: reset to default (no sorting)
      setOrder('desc');
      setOrderBy('date'); // Reset to default sort by date
    }
  };

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Filter and sort candidates
  const filteredAndSortedCandidates = useMemo(() => {
    if (!allCandidates) return [];
    
    let filtered = [...allCandidates];
    
    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(candidate => candidate.status === filters.status);
    }
    
    if (filters.role) {
      filtered = filtered.filter(candidate => candidate.role === filters.role);
    }
    
    if (filters.assignee) {
      filtered = filtered.filter(candidate => candidate.assignee === filters.assignee);
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(candidate => 
        candidate.date >= filters.dateFrom
      );
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(candidate => 
        candidate.date <= filters.dateTo
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];
      
      // Handle date sorting
      if (orderBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [allCandidates, order, orderBy, filters]);

  // Paginate results
  const paginatedCandidates = useMemo(() => {
    const startIndex = (page - 1) * 10;
    return filteredAndSortedCandidates.slice(startIndex, startIndex + 10);
  }, [filteredAndSortedCandidates, page]);

  const totalPages = Math.ceil(filteredAndSortedCandidates.length / 10);

  // Handle row click to show details
  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCandidate(null);
  };

  const handleStatusUpdate = (candidateId, newStatus) => {
    // This would update the backend and refetch data
    console.log(`Status updated for candidate ${candidateId} to ${newStatus}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            Error loading candidates: {error.message}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Breadcrumb />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Candidates - Dashboard Table
        </Typography>
        
        <StatsCards candidates={allCandidates || []} />
        
        <SearchAndFilter
          onFiltersChange={handleFiltersChange}
          filters={filters}
        />
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Showing {paginatedCandidates.length} of {filteredAndSortedCandidates.length} candidates
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
              }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                    hideSortIcon={orderBy !== 'name'}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                  <TableSortLabel
                    active={orderBy === 'role'}
                    direction={orderBy === 'role' ? order : 'asc'}
                    onClick={() => handleSort('role')}
                    hideSortIcon={orderBy !== 'role'}
                  >
                    Role Applied
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                    hideSortIcon={orderBy !== 'status'}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleSort('date')}
                    hideSortIcon={orderBy !== 'date'}
                  >
                    Applied Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>HR Assigned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCandidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(candidate)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {candidate.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={candidate.status.toUpperCase()}
                      color={getStatusColor(candidate.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(candidate.date)}</TableCell>
                  <TableCell>{candidate.assignee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        <CandidateDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          candidate={selectedCandidate}
          onStatusUpdate={handleStatusUpdate}
        />
      </Box>
    </Container>
  );
};

export default CandidateTable;