"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore"; // Import auth store hook
import { useRouter } from "next/navigation"; // Import router for redirection
import Link from "next/link";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

export default function LoginPage() {
  const router = useRouter();
  // Get state and actions from the auth store
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
      isLoading: state.isLoading,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      clearError: state.clearError,
    }))
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Already logged in!");
      router.push("/products"); // Redirect to Catalog page
    }
  }, [isAuthenticated, router]);

  // Clear errors when the component mounts or unmounts
  useEffect(() => {
    clearError(); // Clear error on mount
    return () => {
      clearError(); // Clear error on unmount
    };
  }, [clearError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError(); // Clear previous errors before attempting login

    const success = await login({ email, password });

    if (success) {
      toast.success("Login successful!");
      // Redirecting to Catalog page.
      router.push("/products");
    } else {
      // Error is handled via the 'error' state from the store
      toast.error(error || "Login failed. Please try again."); // Toast shown via useEffect below
    }
  };

  // Show toast notification when error state changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-[75vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-hero-gradientFrom to-hero-gradientTo">
      <div className="w-full max-w-md space-y-8 bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Error Display (Alternative to toast) */}
          {/* {error && <div className="text-red-500 text-sm text-center p-2 bg-red-100 dark:bg-red-900/20 rounded">{error}</div>} */}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Remember me / Forgot Password (for later) */}
          {/* <div className="flex items-center justify-between"> ... </div> */}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-text-light dark:text-text-dark opacity-80">
          Or{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
          >
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
