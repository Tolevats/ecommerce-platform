    "use client"; // Required for using hooks like useQuery and useState

    import React from 'react';
    import { useQuery } from '@tanstack/react-query';
    import { getProducts } from '@/lib/api'; // API function to fetch products
    import ProductCard from '@/components/products/ProductCard'; // Product card component
    import { Product } from '@/lib/types'; // Product type
    

    /*
     * Product Catalog Page: Displays a list of products fetched from the API.
     * Handles loading, error, and empty states.
     */
    export default function ProductsPage() {
      // Fetch products using React Query
      // The query key ['products'] uniquely identifies this query.
      // getProducts is the function that fetches the data.
      const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
        // staleTime and gcTime are inherited from defaultOptions in QueryClient setup
      });

      // === Loading State ===
      // Display placeholders or a spinner while data is being fetched.
      if (isLoading) {
        return (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading products...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 animate-pulse">
                  <div className="aspect-square w-full bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-auto"></div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // === Error State ===
      // Display an error message if the data fetching fails.
      if (isError) {
        return (
          <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Error Fetching Products</h2>
            <p className="text-red-600 dark:text-red-400">
              {error?.message || 'An unexpected error occurred. Please try again later.'}
            </p>
          </div>
        );
      }

      // === Empty State ===
      // Display a message if no products are returned from the API.
      if (!products || products.length === 0) {
        return (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">No products found.</p>
            <p className="text-gray-500 dark:text-gray-400">Check back later or try adjusting your filters.</p>
          </div>
        );
      }

      // === Success State ===
      // Render the grid of products using the ProductCard component.
      return (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-text-light dark:text-text-dark">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Pagination controls will be added here later */}
        </div>
      );
    }

    