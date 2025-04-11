# E-Commerce Store (Next.js, Tailwind, React Query)

A basic e-commerce application built with Next.js (App Router), Tailwind CSS, TanStack Query (React Query), and Zustand, demonstrating modern frontend development patterns.

## Live Demo

[Link to deployed application]

## Features Implemented

* **Project Setup:** Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query, Zustand, ESLint.
* **Product Catalog:**
    * Displays products in a responsive grid (`/products`).
    * Fetches data using TanStack Query (`useQuery`).
    * Category filtering.
    * Client-side pagination.
    * Loading (skeleton), error, and empty states.
* **Product Detail Page:**
    * Dynamic routing (`/products/[id]`).
    * Displays detailed product information (image, description, price, rating).
    * Prefetching data on hover from the catalog page (`prefetchQuery`).
    * "Related Products" section using parallel & dependent queries.
* **Shopping Cart:**
    * Sidebar/Drawer implementation.
    * Client-side state management with Zustand.
    * Add, update quantity, and remove items.
    * Persistence using `sessionStorage` (via Zustand persist middleware).
    * Displays cart summary (total items, subtotal).
    * Optimistic UI update simulation for item removal (`useMutation`).
* **Styling & UX:**
    * Tailwind CSS for all styling with a custom theme.
    * Responsive design for various screen sizes.
    * Dark/Light theme toggle using `next-themes` with persistence.
    * CSS transitions for theme changes, hover effects, cart interactions.
* **Mock Authentication:**
    * Login and Registration pages (`/login`, `/register`).
    * Client-side auth state management with Zustand (persisted to `sessionStorage`).
    * Simulated API calls for login/register.
    * Header updates based on authentication status (Login/Register vs Logout).

## Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v3+
* **Server State Management:** TanStack Query (React Query) v5
* **Client State Management:** Zustand
* **Theming:** next-themes
* **Notifications:** react-hot-toast
* **Linting/Formatting:** ESLint, Prettier
* **Deployment:** Vercel

## Getting Started / Local Setup

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

**Prerequisites:**

* Node.js (v18 or later recommended)
* npm or yarn or pnpm

**Installation & Running:**

1.  **Clone the repository:**
    ```bash
    git clone [https://ghttps://github.com/Tolevats/ecommerce-platform](https://https://github.com/Tolevats/ecommerce-platform)
    cd ecommerce-platform
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure Overview

src/
├── app/ # Next.js App Router (routes, layouts, pages, api)
├── components/ # Reusable UI components (layout, ui, cart, products)
├── hooks/ # Custom React hooks
├── lib/ # Utility functions, API clients, constants, types (api.ts, authApi.ts, query-client.ts, types.ts)
├── store/ # Zustand state management stores (cartStore.ts, authStore.ts)
└── styles/ # Global styles (globals.css)

## Technical Decisions & Architecture

* **Next.js App Router:** Chosen for its Server Components capabilities (though primarily used Client Components here for interactivity), improved data fetching patterns, and nested layout features.
* **TanStack Query (React Query):** Used for managing server state (product/category fetching). Provides excellent caching, background refetching, loading/error state handling, devtools, and hooks like `useQuery`, `useMutation`, `prefetchQuery` which simplify asynchronous data management.
* **Tailwind CSS:** Selected for rapid UI development using utility classes. A custom theme was configured for consistent branding. `darkMode: 'class'` strategy integrates well with `next-themes`.
* **Zustand:** Chosen for simple, scalable client-side state management (cart, mock auth). Its minimal boilerplate and hook-based API make it easy to integrate. The `persist` middleware simplified saving state to `sessionStorage`/`localStorage`.
* **`sessionStorage` for Mock Auth:** Used `sessionStorage` for mock authentication persistence as it automatically clears when the browser session ends, suitable for a temporary mock login state.
* **Client-Side Pagination:** Implemented as a workaround due to the Fake Store API not supporting server-side pagination parameters on the main products endpoint.
* **Optimistic UI for Cart Removal:** Simulated using `useMutation`'s `onMutate` to demonstrate the pattern, even though the underlying operation was updating client state (Zustand). This provides immediate feedback to the user.
* **`next-themes`:** Used for robust theme management, handling class application, system preference detection, and persistence.

## Challenges Faced & Solutions

* **Hydration Mismatches:** Encountered potential hydration errors when using persisted state (Zustand with `persist`, `next-themes`) because the server might render a default state while the client hydrates with persisted state. Solved by implementing `isMounted` checks in components (`ThemeProvider`, `ThemeToggleButton`, `Header`) to ensure UI dependent on persisted state only renders client-side.
* **API Limitations:** The Fake Store API lacks features like server-side pagination or robust filtering, requiring client-side workarounds (fetching all products for filtering/pagination).
* **`useMutation` for Client State:** Decided against using `useMutation` for simple client state updates (like adding to the Zustand cart) as it added unnecessary complexity compared to directly calling store actions. `useMutation` was used primarily to demonstrate optimistic updates in the cart removal simulation.

## Future Improvements

* Implement actual backend and replace mock APIs.
* Add more robust form handling/validation (e.g., using `react-hook-form`).
* Implement proper route protection using Next.js Middleware and cookie-based sessions.
* Add a "Favorites" feature.
* Develop "My Account" page with mock order history.
* Enhance UI/UX with more detailed styling, micro-interactions, and potentially component libraries.
* Improve accessibility (more ARIA attributes, focus management, keyboard navigation testing).
* Add unit and integration tests.
