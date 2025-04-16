import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  mockLogin,
  mockRegister,
  UserCredentials,
  UserRegistrationData,
  User,
} from "@/lib/authApi"; // Import mock API functions and types

// Define the state structure for the auth store
export interface AuthState {
  user: User | null; // User object if logged in, null otherwise
  isAuthenticated: boolean; // Flag indicating login status
  isLoading: boolean; // Loading state for async actions (login/register)
  error: string | null; // Error message from async actions
  // --- Actions ---
  login: (credentials: UserCredentials) => Promise<boolean>; // Returns true on success, false on failure
  logout: () => void;
  register: (userData: UserRegistrationData) => Promise<boolean>; // Returns true on success, false on failure
  clearError: () => void; // Action to clear any previous error messages
}

// Create the Zustand store with persistence to sessionStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // --- Initial State ---
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // --- Actions Implementation ---
      login: async (credentials) => {
        set({ isLoading: true, error: null }); // Start loading, clear previous error
        try {
          console.log("AuthStore: Attempting login...");
          const loggedInUser = await mockLogin(credentials); // Call the mock API
          set({
            user: loggedInUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          console.log("AuthStore: Login successful", loggedInUser);
          return true; // Indicate success
        } catch (err: Error | unknown) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "An unknown login error occurred";
          console.error("AuthStore: Login failed", errorMessage);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage, // Store error message
          });
          return false; // Indicate failure
        }
      },

      logout: () => {
        console.log("AuthStore: Logging out");
        // Clear user info and set isAuthenticated to false
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        // Note: The persist middleware automatically updates sessionStorage
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          console.log("AuthStore: Attempting registration...");
          const registeredUser = await mockRegister(userData); // Call mock API
          set({ isLoading: false, error: null }); // Stop loading on success
          // Optionally log the user in immediately after registration:
          // set({ user: registeredUser, isAuthenticated: true, isLoading: false, error: null });
          console.log(
            "AuthStore: Registration successful (user not auto-logged in)",
            registeredUser
          );
          return true; // Indicate success
        } catch (err: Error | unknown) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "An unknown registration error occurred";
          console.error("AuthStore: Registration failed", errorMessage);
          set({ isLoading: false, error: errorMessage }); // Store error
          return false; // Indicate failure
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      // --- Persistence Configuration ---
      name: "auth-session-storage", // Unique name for sessionStorage key
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
      // Only persist user and isAuthenticated status
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
