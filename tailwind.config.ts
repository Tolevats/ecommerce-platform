import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class", // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        // Custom theme colors here
        primary: {
          DEFAULT: "#3B82F6", // Example: Blue-500
          dark: "#2563EB",   // Example: Blue-600
          light: "#60A5FA",  // Example: Blue-400
        },
        secondary: {
          DEFAULT: "#10B981", // Example: Emerald-500
          dark: "#059669",   // Example: Emerald-600
          light: "#34D399",  // Example: Emerald-400
        },
        background: {
          light: "#FFFFFF", // White background for light mode
          dark: "#111827",  // Gray-900 background for dark mode
        },
        text: {
          light: "#1F2937", // Gray-800 text for light mode
          dark: "#F3F4F6",  // Gray-100 text for dark mode
        },
        // If needed more custom colors like for borders, I'll should define them here
      },
      fontFamily: {
        // I could define custom fonts
        // sans: ['Inter', 'sans-serif'], // I must ensure to import the font in my layout
      },
      // Possibility to extend other theme properties like spacing or borderRadius
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config