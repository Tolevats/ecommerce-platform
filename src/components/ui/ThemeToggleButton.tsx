"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa6";

/**
 * Button component to toggle between light and dark themes.
 * Uses the useTheme hook from next-themes.
 */
export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme(); // Get theme state and setter
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so we can safely show the button
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the effective theme (handling 'system')
  // Fallback to 'light' if theme is somehow undefined initially client-side
  const currentTheme = mounted ? resolvedTheme || theme || "light" : "light";

  // Render nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    // Render a placeholder or null to prevent layout shift but avoid mismatch
    return <div className="w-9 h-9" aria-hidden="true"></div>; // Placeholder with same size as button
  }

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800"
      aria-label={
        currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      type="button" // Explicitly set button type
    >
      {/* Animate icon switch */}
      <div className="relative h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 overflow-hidden">
        {/* Sun Icon - Visible in Light Mode */}
        <span
          className={`absolute inset-0 transition-all duration-300 ease-in-out flex items-center justify-center ${
            currentTheme === "light"
              ? "opacity-100 transform scale-100 rotate-0"
              : "opacity-0 transform scale-50 -rotate-90" // Animate out
          }`}
        >
          <FaSun className="h-full w-full" />
        </span>
        <span
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            currentTheme === "dark"
              ? "opacity-100 transform scale-100 rotate-0"
              : "opacity-0 transform scale-50 rotate-90" // Animate out"
          }`}
        >
          <FaMoon className="h-full w-full" />
        </span>
      </div>
      {/* Simpler version without animation: */}
      {/* {currentTheme === 'dark' ? <FaSun /> : <FaMoon />} */}
    </button>
  );
}
