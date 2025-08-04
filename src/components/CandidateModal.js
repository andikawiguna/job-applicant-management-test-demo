import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import {
  Close,
  Email,
  Phone,
  Work,
  Person,
  CalendarToday,
  Description,
} from '@mui/icons-material';
import { getStatusColor, formatDate } from '../utils/statusColors';

/**
 * Reusable modal component for displaying candidate details
 * @param {Object} props - Component props
 * @param {boolean} props.open - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.candidate - Candidate data object
 */
const CandidateModal = ({ open, onClose, candidate }) => {
  if (!candidate) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div" fontWeight="600">
            {candidate.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Chip
          label={candidate.status.toUpperCase()}
          color={getStatusColor(candidate.status)}
          size="small"
          sx={{ mt: 1 }}
        />
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.email}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.phone}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.role}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">Applied: {formatDate(candidate.date)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">Experience: {candidate.experience} years</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">HR Assigned: {candidate.assignee}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Description sx={{ mr: 1, color: 'text.secondary' }} />
              <Link
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                View Resume
              </Link>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateModal;