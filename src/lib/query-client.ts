import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react'; // Use React cache for singleton pattern in RSC/SSR

// cache() ensures that QueryClient is only created once per request
const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      // Default options for all queries
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection)
      refetchOnWindowFocus: false, // Optional: disable refetch on window focus
      retry: 1, // Retry failed requests once
    },
    mutations: {
      // Default options for all mutations
      retry: 0, // Don't retry mutations by default
    },
  },
}));

export default getQueryClient;