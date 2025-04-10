"use client"; // Needed for hooks (useParams, useQuery) and interactivity (button)

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook to get route parameters
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductById, getProductsByCategory } from '@/lib/api'; // API functions
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard'; // Reuse ProductCard for related items
import { useCartStore } from '@/store/cartStore'; // Zustand store for cart state
import { toast } from 'react-hot-toast'; // For notifications

// Simple Star Rating Component
const StarRating: React.FC<{ rate: number; count: number }> = ({ rate, count }) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            ))}
            {halfStar && (
             <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/></svg> // Half star path
            )}
            {[...Array(emptyStars)].map((_, i) => (
             <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({count} reviews)</span>
        </div>
    );
};

// Product Detail Page : Displays details for a single product and related products.
export default function ProductDetailPage() {
  console.log("ProductDetailPage rendered");
    const params = useParams(); // Get route parameters { id: '...' }
    const productId = params.id as string; // Extract the product ID
    const queryClient = useQueryClient(); // Get query client instance

    // --- Direct Mount Check ---
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    // --- End Mount Check ---

    // Get cart actions and state from Zustand store
    const { addItem: addItemToStore, toggleCart, isOpen: isCartOpen } = useCartStore();

    // === Fetch Main Product Data ===
    const {
        data: product,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        error: productError,
    } = useQuery<Product, Error>({
        // Query key includes the specific product ID
        queryKey: ['product', productId],
        // Fetch the product by its ID
        queryFn: () => getProductById(productId),
        // This query will only run if productId is truthy
        enabled: !!productId,
        // Data might be available immediately if prefetched!
    });

    // === Fetch Related Products (Parallel Query) ===
    const {
      data: relatedProductsData,
      isLoading: isLoadingRelated,
      isError: isErrorRelated,
    } = useQuery<Product[], Error>({
        // Query key includes the category of the main product
        queryKey: ['products', product?.category],
        // Fetch products by the category of the currently viewed product
        queryFn: () => getProductsByCategory(product!.category), // Use non-null assertion or check
        // This query is enabled only AFTER the main product has been fetched successfully and its category is known.
        enabled: !!product?.category,
    });

      // Filter out the current product from the related products list
      const relatedProducts = relatedProductsData?.filter(p => p.id !== product?.id).slice(0, 4); // Limit to 4 related items

    // === Add Item Mutation ===
    const { mutate: addItemMutate, isPending: isAddingToCart } = useMutation({
      // The mutation function now wraps the Zustand store action.
      // It's synchronous, but making the function async to fit the pattern.
      mutationFn: async (productToAdd: Product) => {
          try {
              console.log("AddItem MutationFn: Adding product to Zustand store", productToAdd.id);
              addItemToStore(productToAdd, 1); // Call the synchronous Zustand action
              // No actual async work needed here until calling a backend API
              return Promise.resolve(); // Indicate success
          } catch (error) {
              console.error("AddItem MutationFn: Error adding item", error);
              return Promise.reject(error); // Indicate failure
          }
      },
      onSuccess: (data, variables) => {
          // variables is the product that was passed to mutate()
          console.log("AddItem Mutation: Success for", variables.id);
          toast.success(`${variables.title} added to cart!`);
          // Open cart sidebar only if it's not already open
          if (!isCartOpen) {
              toggleCart();
          }
          // Invalidate queries if adding to cart affected server state
          queryClient.invalidateQueries({ queryKey: ['cartStatus'] });
      },
      onError: (error, variables) => {
          console.error("AddItem Mutation: Error", error);
          toast.error(`Failed to add ${variables.title.substring(0,20)}... to cart.`);
      },
      onSettled: () => { // Runs after onSuccess or onError
      console.log("AddItem Mutation: Settled");
      }
  });
  // --- End Add Item Mutation ---

      // --- Handle Add to Cart ---
      const handleAddToCart = () => {
        if (product && isMounted) { // Ensure product and component are mounted
          addItemMutate(product); // Trigger the mutation
        } else if (!isMounted) {
            toast.error("Page not fully loaded yet.");
        } else {
            toast.error("Product data not available.");
        }
      };

      // === Render Logic ===
      // Loading state for the main product
      if (isLoadingProduct) {
        return (
          <div className="container mx-auto px-4 py-10 animate-pulse">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                 {/* Image Skeleton */}
                 <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                 {/* Details Skeleton */}
                 <div>
                     <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div> {/* Category */}
                     <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div> {/* Title */}
                     <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/5 mb-6"></div> {/* Rating */}
                     <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div> {/* Description line 1 */}
                     <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div> {/* Description line 2 */}
                     <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div> {/* Description line 3 */}
                     <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div> {/* Price */}
                     <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div> {/* Button */}
                 </div>
             </div>
          </div>
        );
      }

      // Error state for the main product
      if (isErrorProduct) {
        return (
          <div className="container mx-auto px-4 py-10 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Error Loading Product</h2>
            <p className="text-red-600 dark:text-red-400">
              {productError?.message.includes('Not found')
                ? `Sorry, we couldn't find a product with ID ${productId}.`
                : productError?.message || 'An unexpected error occurred.'}
            </p>
            <Link href="/products" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Back to Products
            </Link>
          </div>
        );
      }

      // If product data is successfully loaded
      if (product) {
        return (
          <div className="container mx-auto px-4 py-10">
            {/* Main Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {/* Product Image */}
              <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  style={{ objectFit: 'contain' }}
                  className="p-4 md:p-8" // Add padding around the image within the container
                  priority // Prioritize loading the main product image
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  onError={(e) => { 
                    e.currentTarget.src = `https://placehold.co/600x600/e2e8f0/9ca3af?text=Image+Not+Available`; 
                    e.currentTarget.alt = 'Image not found';
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-center">
                <span className="text-sm font-medium text-primary-dark dark:text-primary-light mb-2 capitalize">
                  {product.category}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark mb-3">
                  {product.title}
                </h1>
                <div className="mb-4">
                  <StarRating rate={product.rating.rate} count={product.rating.count} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-3xl lg:text-4xl font-extrabold text-text-light dark:text-text-dark mb-6">
                  ${product.price.toFixed(2)}
                </p>

                {/* === Add to Cart Button (Using Mutation) === */}
                <button
                    onClick={handleAddToCart}
                    // Disable button while the mutation is pending
                    disabled={isAddingToCart}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-label={`Add ${product.title} to cart`}
                >
                    {isAddingToCart ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                          Adding...
                          </>
                    ) : (
                      'Add to Cart'
                    )}
                </button>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">You Might Also Like</h2>
                {/* Loading state for related products */}
                 {isLoadingRelated && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                     {Array.from({ length: 4 }).map((_, index) => (
                       <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                         <div className="aspect-square w-full bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                         <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                         <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                         <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-auto"></div>
                       </div>
                     ))}
                   </div>
                 )}
                {/* Error state for related products */}
                {isErrorRelated && !isLoadingRelated && (
                    <p className="text-sm text-red-500 dark:text-red-400">Could not load related products.</p>
                )}
                {/* Display related products */}
                {!isLoadingRelated && !isErrorRelated && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                      <ProductCard key={relatedProduct.id} product={relatedProduct} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      // Fallback if product is not found after loading and no error thrown
      return (
          <div className="container mx-auto px-4 py-10 text-center">
              <p>Product not found.</p>
               <Link href="/products" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                 Back to Products
               </Link>
          </div>
      );
}

    