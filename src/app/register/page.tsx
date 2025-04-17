"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, AuthState } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, isAuthenticated, clearError } =
    useAuthStore(
      useShallow((state: AuthState) => ({
        register: state.register,
        isLoading: state.isLoading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        clearError: state.clearError,
      }))
    );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if already authenticated when component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Already logged in. Redirecting...");
      router.push("/products");
    }
  }, [isAuthenticated, router]);

  // Clear errors when the component mounts or unmounts
  useEffect(() => {
    clearError(); // Clear on mount
    return () => {
      clearError(); // Clear on unmount
    };
  }, [clearError]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError(); // Clear previous errors before new attempt

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) { // Minimum password length
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (!email.includes("@")) { // Basic email validation
      toast.error("Please enter a valid email address.");
      return;
    }

    // Call the register function from the store
    const success = await register({ name, email, password });

    if (success) {
      toast.success("Registration successful! Redirecting to login...");
      router.push("/login"); // Redirect to login page after successful registration
    }
  };

  // Show toast notification when error state changes in the store
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-[75vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-hero-gradientFrom to-hero-gradientTo">
      {/* Form container using theme bg colors for light/dark mode */}
      <div className="w-full max-w-md space-y-8 bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-text-light dark:text-text-dark bg-background-light dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Username"
              />
            </div>
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
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-text-light dark:text-text-dark bg-background-light dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
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
                autoComplete="new-password" // Important for password managers
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-text-light dark:text-text-dark bg-background-light dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password" // Important for password managers
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-text-light dark:text-text-dark bg-background-light dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {/* Loading Spinner */}
              {isLoading && ( // Conditional rendering using &&
                <svg
                  // Use theme foreground color for spinner
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground"
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
              )}
              {/* Button Text */}
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Link to Sign In Page */}
        <p className="mt-2 text-center text-sm text-text-light dark:text-text-dark opacity-80">
          {" "}
          {/* Slightly reduced opacity for secondary text */}
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
