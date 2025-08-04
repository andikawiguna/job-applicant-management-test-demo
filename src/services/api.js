import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Fetches paginated candidates data from the API
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} API response with candidates data and pagination info
 */
export const fetchCandidates = async (page = 1, limit = 10) => {
  const response = await api.get('/candidates', {
    params: {
      _page: page,
      _limit: limit,
      _sort: 'date',
      _order: 'desc'
    }
  });
  
  // Extract total count from headers for pagination
  const total = parseInt(response.headers['x-total-count'] || '0');
  
  return {
    data: response.data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

/**
 * Fetches all candidates without pagination
 * @returns {Promise<Array>} Array of all candidates
 */
export const fetchAllCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

/**
 * Fetches a single candidate by ID
 * @param {number} id - Candidate ID
 * @returns {Promise<Object>} Candidate data
 */
export const fetchCandidateById = async (id) => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};