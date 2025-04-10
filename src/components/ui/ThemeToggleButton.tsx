"use client";

import * as React from "react";
import { useTheme } from "next-themes";

// Using simple SVG icons for Sun/Moon to avoid installing an icon library
// Replace with other icons if preferred
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25c.69 0 1.323-.287 1.767-.771A2.25 2.25 0 0 0 14.25 12a2.25 2.25 0 0 0-2.25-2.25Z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

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
  const currentTheme = resolvedTheme || theme;

  // Render nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    // Render a placeholder or null to prevent layout shift but avoid mismatch
    return <div className="w-9 h-9"></div>; // Placeholder with same size as button
  }

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800"
      aria-label={
        currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {/* Animate icon switch */}
      <div className="relative w-5 h-5">
        <span
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            currentTheme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        >
          <SunIcon />
        </span>
        <span
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            currentTheme === "light" ? "opacity-100" : "opacity-0"
          }`}
        >
          <MoonIcon />
        </span>
      </div>

      {/* Simpler version without animation: */}
      {/* {currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />} */}
    </button>
  );
}
