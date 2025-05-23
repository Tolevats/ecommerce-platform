# E-Commerce Store (Next.js, Tailwind, React Query)

A basic e-commerce application built with Next.js (App Router), Tailwind CSS, TanStack Query (React Query), and Zustand, demonstrating modern frontend development patterns.

<!-- ## Live Demo

[Link to deployed application] -->

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

* **Framework:** Next.js 15+ (App Router)
* **Language:** TypeScript v5+
* **Styling:** Tailwind CSS v4+
* **Server State Management:** TanStack Query (React Query) v5+
* **Client State Management:** Zustand v5+
* **Theming:** next-themes
* **Notifications:** react-hot-toast
* **Linting/Formatting:** ESLint, Prettier
* **Deployment:** Vercel

## Getting Started / Local Setup

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

**Prerequisites:**

* Node.js (v22 or later recommended)
* npm or yarn or pnpm

**Installation & Running:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tolevats/ecommerce-platform.git
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

src/<br>
├── app/ # Next.js App Router (routes, layouts, pages, api) <br>
├── components/ # Reusable UI components (layout, ui, cart, products)<br>
├── hooks/ # Custom React hooks<br>
├── lib/ # Utility functions, API clients, constants, types (api.ts, authApi.ts, query-client.ts, types.ts)<br>
├── store/ # Zustand state management stores (cartStore.ts, authStore.ts)<br>
└── styles/ # Global styles (globals.css)

## Design Assets

* **Flow Diagram:** [Link to flow-diagram.pdf](./public/assets/design/flow-diagram.pdf) 
* **User Journey:** [Link to user-journey.png](./public/assets/design/user-journey.png)

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

* **Zustand Hydration Conflicts:** Significant challenges were encountered with hydration errors (`getServerSnapshot`, `Maximum update depth exceeded`) when using Zustand's `persist` middleware with `sessionStorage`/`localStorage` in the Next.js App Router. The initial client render state (from storage) conflicted with the server-rendered state.
    * **Solution:** Implemented an `isMounted` state check within components (`Header`, `CartSidebar`) that display persisted state. These components render default/placeholder values initially and only display the actual state from Zustand after the `useEffect` hook confirms the component has mounted on the client. This aligns the initial client render with the server render, resolving the errors.
* **`useShallow` for Performance:** When selecting object slices from Zustand (e.g., `{ user, isAuthenticated }`), React might re-render even if the underlying values haven't changed, simply because the object reference is new on each render.
    * **Solution:** Imported and used `useShallow` from `zustand/react/shallow` as the second argument to the `useAuthStore` hook in the `Header` component. This ensures the component only re-renders if the actual values within the selected slice change.
* **API Limitations:** The Fake Store API lacks features like server-side pagination, requiring client-side workarounds.
* **`useMutation` Requirement:** Adapting `useMutation` for synchronous client-state updates (Zustand) required wrapping the synchronous store actions within the `mutationFn`, adding a layer of indirection primarily to meet the evaluation criteria.

## Future Improvements

* Implement actual backend and replace mock APIs.
* Add more robust form handling/validation (e.g., using `react-hook-form`).
* Implement proper route protection using Next.js Middleware and cookie-based sessions.
* Finish checkout process/order confirmation.
* Add a "Favorites" feature.
* Develop "My Account" page with mock order history.
* Enhance UI/UX with more detailed styling, micro-interactions, and potentially component libraries.
* Improve accessibility (more ARIA attributes, focus management, keyboard navigation testing).
* Add unit and integration tests.
