import { useQuery } from '@tanstack/react-query';
import { fetchCandidates, fetchAllCandidates } from '../services/api';

/**
 * Custom hook for fetching paginated candidates data using React Query
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @returns {Object} Query result with data, loading, error states
 */
export const useCandidates = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['candidates', page, limit],
    queryFn: () => fetchCandidates(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Custom hook for fetching all candidates data using React Query
 * @returns {Object} Query result with all candidates data
 */
export const useAllCandidates = () => {
  return useQuery({
    queryKey: ['candidates', 'all'],
    queryFn: fetchAllCandidates,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};