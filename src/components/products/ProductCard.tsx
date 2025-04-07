    import React from 'react';
    import Image from 'next/image'; // Use Next.js Image for optimization
    import Link from 'next/link'; // Link to product detail page
    import { Product } from '@/lib/types'; // Import the Product type

    interface ProductCardProps {
      product: Product;
    }

    /*
     * A component to display a single product in a card format.
     * Links to the product's detail page.
     * @param {ProductCardProps} props - The props containing the product data.
     */
    const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
      return (
        <Link href={`/products/${product.id}`} className="group block"> {/* Link wrapping the card */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 h-full flex flex-col transition-shadow duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-800/60 overflow-hidden">
            {/* Product Image */}
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 relative">
              <Image
                src={product.image}
                alt={product.title}
                fill // Use fill to make image cover the container
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading based on viewport
                style={{ objectFit: 'contain' }} // 'contain' to show the whole image, 'cover' to fill
                className="group-hover:scale-105 transition-transform duration-300 ease-in-out p-2" // Subtle zoom on hover
                // Add placeholder and error handling for robustness
                placeholder="blur"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" // Simple gray placeholder
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = `https://placehold.co/300x300/e2e8f0/9ca3af?text=Image+Not+Found`;
                }}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
              {/* Category Badge */}
              <span className="text-xs font-medium text-primary-dark dark:text-primary-light mb-1 capitalize">
                {product.category}
              </span>

              {/* Product Title */}
              <h3 className="text-sm font-semibold text-text-light dark:text-text-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                {/* Truncate long titles */}
                {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
              </h3>

              {/* Price - push to bottom */}
              <p className="mt-auto text-lg font-bold text-text-light dark:text-text-dark">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      );
    };

    export default ProductCard;
    