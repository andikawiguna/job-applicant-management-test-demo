import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Chip,
  Button,
  Pagination,
  Grid,
  CircularProgress,
  Alert,
  Menu,
} from '@mui/material';
import { Person, Visibility } from '@mui/icons-material';
import { useCandidates } from '../hooks/useCandidates';
import { getStatusColor, formatDate } from '../utils/statusColors';
import CandidateModal from '../components/CandidateModal';
import StatusChangeForm from '../components/StatusChangeForm';

/**
 * Card list view for displaying candidates
 * Shows candidates in card format with pagination
 */
const CandidateList = () => {
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [statusChangeCandidate, setStatusChangeCandidate] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);
  
  const { data, isLoading, error } = useCandidates(page, 10);

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle view details action
  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleStatusMenuOpen = (event, candidate) => {
    event.stopPropagation();
    setStatusMenuAnchor(event.currentTarget);
    setStatusChangeCandidate(candidate);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
    setStatusChangeCandidate(null);
    setStatusError(null);
  };

  const handleStatusChange = async (newStatus) => {
    setStatusLoading(true);
    setStatusError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the backend and refetch data
      console.log(`Status changed for ${statusChangeCandidate.name} to ${newStatus}`);
      
      handleStatusMenuClose();
    } catch (err) {
      setStatusError('Failed to update status. Please try again.');
    } finally {
      setStatusLoading(false);
    }
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
          Candidates - Card List
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Showing {data?.data?.length || 0} of {data?.total || 0} candidates
        </Typography>

        <Grid container spacing={2}>
          {data?.data?.map((candidate) => (
            <Grid item xs={12} key={candidate.id}>
              <Card sx={{ '&:hover': { boxShadow: 3 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="600">
                        {candidate.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.role}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={candidate.status.toUpperCase()}
                        color={getStatusColor(candidate.status)}
                        size="small"
                      />
                      
                      <Typography variant="body2" color="text.secondary">
                        Applied: {formatDate(candidate.date)}
                      </Typography>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleViewDetails(candidate)}
                      >
                        View Details
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => handleStatusMenuOpen(e, candidate)}
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        Quick Action
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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

        <Menu
          anchorEl={statusMenuAnchor}
          open={Boolean(statusMenuAnchor)}
          onClose={handleStatusMenuClose}
          PaperProps={{
            sx: { minWidth: 250 }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Change Status for {statusChangeCandidate?.name}
            </Typography>
            <StatusChangeForm
              currentStatus={statusChangeCandidate?.status}
              onStatusChange={handleStatusChange}
              loading={statusLoading}
              error={statusError}
            />
          </Box>
        </Menu>
      </Box>
    </Container>
  );
};

export default CandidateList;