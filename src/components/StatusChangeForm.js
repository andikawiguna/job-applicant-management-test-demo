import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { getStatusColor } from '../utils/statusColors';

const STATUS_OPTIONS = ['new', 'processed', 'rejected', 'hired'];

/**
 * Reusable form component for changing candidate status
 * @param {Object} props - Component props
 * @param {string} props.currentStatus - Current candidate status
 * @param {Function} props.onStatusChange - Callback when status changes
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 */
const StatusChangeForm = ({ currentStatus, onStatusChange, loading = false, error = null }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [validationError, setValidationError] = useState('');

  // Get available status options (exclude current status)
  const availableStatuses = STATUS_OPTIONS.filter(status => status !== currentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!selectedStatus) {
      setValidationError('Please select a status');
      return;
    }

    if (selectedStatus === currentStatus) {
      setValidationError('Please select a different status');
      return;
    }

    setValidationError('');
    onStatusChange(selectedStatus);
    setSelectedStatus('');
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setValidationError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {validationError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Change Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={selectedStatus}
          label="Change Status"
          onChange={handleStatusChange}
          disabled={loading}
        >
          {availableStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: `${getStatusColor(status)}.main`,
                  }}
                />
                {status.toUpperCase()}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading || !selectedStatus}
        sx={{ mt: 1 }}
      >
        {loading ? 'Updating...' : 'Update Status'}
      </Button>
    </Box>
  );
};

export default StatusChangeForm;