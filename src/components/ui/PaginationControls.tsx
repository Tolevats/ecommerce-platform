import React from 'react';
// Consider adding icons later!!!

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean; // To disable controls while loading new data
}

/*
 * Reusable pagination controls component.
 * Displays Previous/Next buttons and current page info.
 * @param {PaginationControlsProps} props - Component props.
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  // Don't render controls if there's only one page or fewer
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const baseButtonClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center";
  const activeClass = "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600";
  const disabledClass = "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed";
  const loadingClass = "opacity-50 cursor-wait"; // Style for loading state

  return (
    <div className="flex items-center justify-center space-x-4 mt-8 py-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        aria-label="Go to previous page"
        className={`${baseButtonClass} ${
          currentPage === 1 || isLoading ? disabledClass : activeClass
        } ${isLoading ? loadingClass : ''}`}
      >
        Previous
      </button>

      {/* Page Indicator */}
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Go to next page"
        className={`${baseButtonClass} ${
          currentPage === totalPages || isLoading ? disabledClass : activeClass
        } ${isLoading ? loadingClass : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;