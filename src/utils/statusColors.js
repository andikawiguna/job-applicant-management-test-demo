/**
 * Maps candidate status to appropriate Material-UI colors
 * @param {string} status - Candidate status
 * @returns {string} Material-UI color variant
 */
export const getStatusColor = (status) => {
  const statusColors = {
    new: 'info',
    processed: 'warning',
    rejected: 'error',
    hired: 'success',
  };
  return statusColors[status] || 'default';
};

/**
 * Formats date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};