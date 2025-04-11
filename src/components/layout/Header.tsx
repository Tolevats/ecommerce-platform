"use client"; // Needed for store hook

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useShallow } from "zustand/shallow";
import { ThemeToggleButton } from "../ui/ThemeToggleButton";
import { FaUser, FaRegCircleUser, FaUserPlus, FaBagShopping } from "react-icons/fa6";
import { useAuthStore } from "@/store/authStore"; // Import auth store hook
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Header component with site title/logo and cart toggle button.
const Header: React.FC = () => {
  const router = useRouter();
  // Get cart state and actions
  const { toggleCart } = useCartStore(
    useShallow((state) => ({
      toggleCart: state.toggleCart,
    }))
  );
  //Get state directly (unconditional)
  const totalItemsRaw = useCartStore(selectTotalItems);

  // Get auth state and actions
  const { isAuthenticated, user, logout } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      logout: state.logout,
    }))
  );

  // --- Direct Mount Check --- use a 'mounted' state to ensure auth-dependent UI renders only client-side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // --- End Mount Check ---

  // Use state values ONLY after mount, otherwise use defaults
  const totalItems = isMounted ? totalItemsRaw : 0;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    router.push("/products"); // Redirect to Catalog page after logout
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex-shrink-0">
          <Link
            href="/products"
            className="text-xl font-bold text-primary dark:text-primary-light"
          >
            OnPointStore
          </Link>
          {/* Conditionally show Account link */}
          {isMounted && isAuthenticated && (
            <Link
              href="/account"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaRegCircleUser className="inline-block mr-2" />
              My Account
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/products"
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            Products
          </Link>
          {/* Guest Links - Desktop */}
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <FaUser className="inline-block mr-2" />
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Right side icons: Cart and Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Guest Links - Mobile */}
          {!isAuthenticated && (
            <div className="flex items-center space-x-2 md:hidden">
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <FaUser className="inline-block mr-2" />
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                <FaUserPlus className="inline-block mr-2" />
                Register
              </Link>
            </div>
          )}
          {/* Theme Toggle Button */}
          <ThemeToggleButton />

          {/* Cart Button */}
          {/* <div className="flex items-center"></div> */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            {/* Cart Icon SVG */}
            <FaBagShopping className="h-7 w-7" />
            {/* Cart Item Count Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          {/* User/Account */}
          <div className="flex items-center">
            {/* Render only after client-side hydration */}
            {!isMounted ? (
              // Placeholder to prevent layout shift
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : isAuthenticated ? (
              // --- Logged In View ---
              <div className="relative">
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
                {/* Simple welcome message - replace with dropdown/avatar later */}
                <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                  Hi, {user?.name?.split(" ")[0]}
                </span>
              </div>
            ) : (
              // --- Logged Out View ---
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md border border-gray-300 dark:border-gray-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
