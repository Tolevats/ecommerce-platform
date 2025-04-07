import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import reactQueryPlugin from "@tanstack/eslint-plugin-query";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat to translate eslintrc configs (like Next.js')
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/* @type {import('eslint').Linter.FlatConfig[]} */
// Apply Next.js recommended configs using FlatCompat
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Configure TanStack Query Plugin and Recommended Rules for project files
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      // Register the TanStack Query plugin
      '@tanstack/query': reactQueryPlugin,
    },
    rules: {
      // Spread rules from the plugin's 'recommended' config
      ...reactQueryPlugin.configs.recommended.rules,

      // --- Custom Overrides/Additions ---
      '@tanstack/query/exhaustive-deps': 'error', // Enforce exhaustive dependencies in useQuery/useMutation hooks
      '@tanstack/query/no-rest-destructuring': 'warn', // Prevent destructuring of query results
    },
    languageOptions: {
       // Global variables available
       globals: {
          ...globals.browser, // Standard browser globals (window, document, etc.)
          ...globals.node,    // Standard Node.js globals (process, console, etc. - useful for Next.js)
          React: "readonly", // React global variable
       },
       // Parser options if not adequately handled by Next.js preset
       parserOptions: {
          ecmaFeatures: { jsx: true },
       },
    },
    // Settings if required by plugins
    settings: {
       react: { version: 'detect' },
     },
  },

  // Global ignores (optional but recommended)
  {
     ignores: [
        ".next/",
        "node_modules/",
        "dist/",
     ],
  },
];

export default eslintConfig;
