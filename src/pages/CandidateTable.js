import React, { useState, useMemo } from 'react';
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
import { useCandidates } from '../hooks/useCandidates';
import { getStatusColor, formatDate } from '../utils/statusColors';
import CandidateModal from '../components/CandidateModal';

/**
 * Table view for displaying candidates with sorting functionality
 */
const CandidateTable = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { data, isLoading, error } = useCandidates(page, 10);

  // Handle sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Sort candidates based on current sort settings
  const sortedCandidates = useMemo(() => {
    if (!data?.data) return [];
    
    return [...data.data].sort((a, b) => {
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
  }, [data?.data, order, orderBy]);

  // Handle row click to show details
  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
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
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Candidates - Dashboard Table
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Showing {data?.data?.length || 0} of {data?.total || 0} candidates
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'role'}
                    direction={orderBy === 'role' ? order : 'asc'}
                    onClick={() => handleSort('role')}
                  >
                    Role Applied
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Applied Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>HR Assigned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCandidates.map((candidate) => (
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

        {data?.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={data.totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        <CandidateModal
          open={modalOpen}
          onClose={handleCloseModal}
          candidate={selectedCandidate}
        />
      </Box>
    </Container>
  );
};

export default CandidateTable;