"use client"; // This component needs to be a client component

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes"; // Import types

/*
 * ThemeProvider component using next-themes.
 * Configures theme switching based on class attribute, supports system preference,
 * and provides the theme context to the application.
 * @param {ThemeProviderProps} props - Props passed to the next-themes provider.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Mount check to avoid hydration issues, ensuring provider only renders client-side initially
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render children directly on the server/initial render to avoid layout shifts
    // The actual theme class will be applied client-side by NextThemesProvider.
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class" // Apply theme by adding/removing class on <html> tag
      defaultTheme="system" // Default to system preference
      enableSystem // Allow detecting and using system preference
      disableTransitionOnChange // Prevent style flashing during theme change if needed
      {...props} // Pass any additional props
    >
      {children}
    </NextThemesProvider>
  );
}
