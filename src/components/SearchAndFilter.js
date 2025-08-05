import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Typography,
  Collapse,
  Grid,
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';

const STATUS_OPTIONS = ['new', 'processed', 'rejected', 'hired'];
const ROLE_OPTIONS = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
  'DevOps Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Product Manager',
  'UX Designer', 'UI Designer', 'QA Engineer', 'Security Engineer', 'Cloud Architect',
  'Software Architect', 'Technical Lead', 'Scrum Master', 'Business Analyst',
  'Data Analyst', 'System Administrator', 'Network Engineer'
];
const HR_ASSIGNEES = [
  'Alice Cooper', 'Bob Wilson', 'Carol Davis', 'David Miller', 'Eva Johnson',
  'Frank Brown', 'Grace Lee', 'Henry Taylor', 'Iris Chen', 'Jack Robinson'
];

/**
 * Advanced search and filter component for candidate table
 * @param {Object} props - Component props
 * @param {Function} props.onFiltersChange - Callback when filters change
 * @param {Object} props.filters - Current filter values
 */
const SearchAndFilter = ({ onFiltersChange, filters = {} }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (event) => {
    onFiltersChange({
      ...filters,
      search: event.target.value,
    });
  };

  const handleFilterChange = (filterKey, value) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
          />
          
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            color={hasActiveFilters ? 'primary' : 'default'}
          >
            <FilterList />
          </IconButton>
          
          {hasActiveFilters && (
            <IconButton onClick={clearFilters} color="error">
              <Clear />
            </IconButton>
          )}
          
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {filters.status && (
              <Chip
                label={`Status: ${filters.status.toUpperCase()}`}
                onDelete={() => handleFilterChange('status', '')}
                size="small"
                color="primary"
              />
            )}
            {filters.role && (
              <Chip
                label={`Role: ${filters.role}`}
                onDelete={() => handleFilterChange('role', '')}
                size="small"
                color="primary"
              />
            )}
            {filters.assignee && (
              <Chip
                label={`HR: ${filters.assignee}`}
                onDelete={() => handleFilterChange('assignee', '')}
                size="small"
                color="primary"
              />
            )}
            {filters.dateFrom && (
              <Chip
                label={`From: ${filters.dateFrom}`}
                onDelete={() => handleFilterChange('dateFrom', '')}
                size="small"
                color="primary"
              />
            )}
            {filters.dateTo && (
              <Chip
                label={`To: ${filters.dateTo}`}
                onDelete={() => handleFilterChange('dateTo', '')}
                size="small"
                color="primary"
              />
            )}
          </Box>
        )}

        {/* Filter Controls */}
        <Collapse in={showFilters}>
          <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" gutterBottom>
              Filter Options
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status || ''}
                    label="Status"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    {STATUS_OPTIONS.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={filters.role || ''}
                    label="Role"
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    {ROLE_OPTIONS.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>HR Assigned</InputLabel>
                  <Select
                    value={filters.assignee || ''}
                    label="HR Assigned"
                    onChange={(e) => handleFilterChange('assignee', e.target.value)}
                  >
                    <MenuItem value="">All HR</MenuItem>
                    {HR_ASSIGNEES.map((hr) => (
                      <MenuItem key={hr} value={hr}>
                        {hr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Applied From"
                  type="date"
                  size="small"
                  fullWidth
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Applied To"
                  type="date"
                  size="small"
                  fullWidth
                  value={filters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>
  );
};

export default SearchAndFilter;