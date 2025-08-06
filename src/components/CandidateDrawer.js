import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Grid,
  Link,
  Alert,
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
import StatusChangeForm from './StatusChangeForm';

/**
 * Reusable side drawer component for displaying and editing candidate details
 * @param {Object} props - Component props
 * @param {boolean} props.open - Drawer open state
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.candidate - Candidate data object
 * @param {Function} props.onStatusUpdate - Status update handler
 */
const CandidateDrawer = ({ open, onClose, candidate, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!candidate) return null;

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusUpdate) {
        onStatusUpdate(candidate.id, newStatus);
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          height: '100%',
          borderRadius: 0,
          transition: 'transform 0.3s ease-in-out',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
        },
      }}
      transitionDuration={300}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" component="div" fontWeight="600" sx={{ mb: 1 }}>
              {candidate.name}
            </Typography>
            <Chip
              label={candidate.status.toUpperCase()}
              color={getStatusColor(candidate.status)}
              size="small"
            />
          </Box>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{ 
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
              '&:hover': { 
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.200'
              },
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
              color: 'text.primary'
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Success Message */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Status updated successfully!
          </Alert>
        )}

        {/* Contact Information */}
        <Typography variant="h6" gutterBottom fontWeight="600">
          Contact Information
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.email}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.phone}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Professional Information */}
        <Typography variant="h6" gutterBottom fontWeight="600">
          Professional Details
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{candidate.role}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">Experience: {candidate.experience} years</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">Applied: {formatDate(candidate.date)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">HR Assigned: {candidate.assignee}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

        <Divider sx={{ mb: 3 }} />

        {/* Status Change Form */}
        <Typography variant="h6" gutterBottom fontWeight="600">
          Update Status
        </Typography>
        
        <StatusChangeForm
          currentStatus={candidate.status}
          onStatusChange={handleStatusChange}
          loading={loading}
          error={error}
        />
      </Box>
    </Drawer>
  );
};

export default CandidateDrawer;