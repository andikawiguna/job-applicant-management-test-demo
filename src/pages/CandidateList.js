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
} from '@mui/material';
import { Person, Visibility } from '@mui/icons-material';
import { useCandidates } from '../hooks/useCandidates';
import { getStatusColor, formatDate } from '../utils/statusColors';
import CandidateModal from '../components/CandidateModal';

/**
 * Card list view for displaying candidates
 * Shows candidates in card format with pagination
 */
const CandidateList = () => {
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
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
      </Box>
    </Container>
  );
};

export default CandidateList;