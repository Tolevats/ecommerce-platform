// component to wrap app, providing the QueryClient context
"use client"; // React Query hooks and context providers work on the client

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Included for debugging during development
import getQueryClient from "@/lib/query-client"; // Import the cached getter

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Get the singleton QueryClient instance
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* WIP application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}