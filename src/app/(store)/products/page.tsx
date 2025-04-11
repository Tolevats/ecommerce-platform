"use client"; // Required for using hooks like useQuery and useState

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories, getProductsByCategory } from "@/lib/api"; // API function to fetch products
import ProductCard from "@/components/products/ProductCard";
import PaginationControls from "@/components/ui/PaginationControls";
import { Product, Category } from "@/lib/types";

const ITEMS_PER_PAGE = 12; // Number of products to display per page

/*
 * Product Catalog Page: Displays a list of products fetched from the API.
 * Includes category filtering.
 * Handles loading, error, and empty states.
 */
export default function ProductsPage() {
  // State to keep track of the currently selected category filter
  // null represents "All Categories"
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);

  // === Fetch Categories ===
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"], // Unique key for categories query
    queryFn: getCategories, // API function to fetch categories
    staleTime: 60 * 60 * 1000, // Categories don't change often, so keep for 1 hour
    gcTime: 6 * 60 * 60 * 1000, // Keep in cache for 6 hours
  });

  // === Fetch Products ===
  // This query still fetches ALL products for the selected category
  const {
    data: allProducts, // Renamed to avoid confusion with filtered products
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: productsError,
  } = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? getProductsByCategory(selectedCategory)
        : getProducts(),
  });

  // === Pagination Logic ===
  // Calculate the products to display on the current page
  const paginatedProducts = useMemo(() => {
    if (!allProducts) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allProducts.slice(startIndex, endIndex);
  }, [allProducts, currentPage]); // Recalculate only when products or page changes

  // Calculate total number of pages
  const totalPages = useMemo(() => {
    if (!allProducts) return 0;
    return Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  }, [allProducts]); // Recalculate only when products change

  // Reset to page 1 when the category filter changes
  useEffect(() => {
    setCurrentPage(1); // Reset page number
  }, [selectedCategory]);

  // Handle category selection
  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
  };

  // Handle page change from pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // === Render Logic ===

  // Combined loading state: Show loading if either categories (initially) or products are loading
  const isLoading = isLoadingCategories || isLoadingProducts;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-text-light dark:text-text-dark">
        Our Products
      </h1>

      {/* Category Filters Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
          Filter by Category
        </h2>
        {/* Handle loading state for categories */}
        {isLoadingCategories && (
          <div className="flex space-x-2 animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-20"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-24"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-16"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-28"></div>
          </div>
        )}
        {/* Handle error state for categories */}
        {isErrorCategories && (
          <p className="text-red-600 dark:text-red-400">
            Could not load categories.
          </p>
        )}
        {/* Display category filters/buttons */}
        {categories && (
          <div className="flex flex-wrap gap-2">
            {/* "All Categories" Button */}
            <button
              onClick={() => handleSelectCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === null
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All
            </button>
            {/* Buttons for each category */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Section */}
      <div>
        {/* === Loading State (Products) === */}
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              {isLoadingCategories
                ? `Loading categories...`
                : `Loading products...`}
            </p>
            {/* Grid of skeleton loaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: ITEMS_PER_PAGE ? 4 : 8 }).map(
                (
                  _,
                  index // Show fewer skeletons when filtering
                ) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 animate-pulse"
                  >
                    <div className="aspect-square w-full bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-auto"></div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* === Error State (Products) === */}
        {!isLoadingProducts && isErrorProducts && (
          <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
              Error Fetching Products
            </h2>
            <p className="text-red-600 dark:text-red-400">
              {productsError?.message ||
                "An unexpected error occurred. Please try again later."}
            </p>
          </div>
        )}

        {/* === Empty State (Products) === */}
        {!isLoadingProducts &&
          !isErrorProducts &&
          (!allProducts || allProducts.length === 0) && (
            <div className="text-center py-10">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                No products found
                {selectedCategory ? ` in "${selectedCategory}"` : ""}.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Try selecting a different category.
              </p>
            </div>
          )}

        {/* === Success State (Products) === */}
        {/* Render only the paginated products */}
        {!isLoadingProducts &&
          !isErrorProducts &&
          paginatedProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        {/* === Pagination Controls === */}
        {/* Render controls only if there are products and more than one page */}
        {!isLoadingProducts && !isErrorProducts && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoadingProducts} // Pass loading state to disable controls during refetch
          />
        )}
      </div>
    </div>
  );
}
