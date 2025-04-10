"use client"; // Needed for store hook

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore, selectTotalItems } from '@/store/cartStore';
import { useShallow } from 'zustand/shallow';
import { ThemeToggleButton } from '../ui/ThemeToggleButton';
import { FaBagShopping } from "react-icons/fa6";

// Header component with site title/logo and cart toggle button.
const Header: React.FC = () => {
  // Get cart state and actions
  const { toggleCart } = useCartStore(useShallow((state) => ({
    toggleCart: state.toggleCart,
  })));

  // --- Direct Mount Check ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // --- End Mount Check ---

  //Get state directly (unconditional)
  const totalItemsRaw = useCartStore(selectTotalItems); 

  // Use state values ONLY after mount, otherwise use defaults
  const totalItems = isMounted ? totalItemsRaw : 0;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex-shrink-0">  
          <Link href="/" className="text-xl font-bold text-primary dark:text-primary-light">
            OnPointStore
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
           <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
             Products
            </Link>
            {/* Add other links here later */}
        </div>

        {/* Right side icons: Cart and Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme Toggle Button */}
          <ThemeToggleButton />

          {/* Cart Button */}
          {/* <div className="flex items-center"> */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              {/* Cart Icon SVG */}
              <FaBagShopping className="h-6 w-6" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg> */}
            {/* Cart Item Count Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          {/* Add User/Account Button here later */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
    