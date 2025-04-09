import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/types'; // Import Product type

// Define the structure of an item in the cart
export interface CartItem {
    product: Product;
    quantity: number;
}

// Define the state structure for the cart store
interface CartState {
    items: CartItem[]; // Array to hold cart items
    isOpen: boolean;    // Flag to control cart sidebar visibility
    // --- Actions ---
    addItem: (product: Product, quantity?: number) => void; // Add item or increase quantity
    removeItem: (productId: number) => void; // Remove item completely
    updateQuantity: (productId: number, quantity: number) => void; // Set specific quantity
    clearCart: () => void; // Remove all items
    toggleCart: () => void; // Open/close the cart sidebar
}

// Create the Zustand store with persistence
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
        // --- Initial State ---
          items: [],
          isOpen: false,

          // --- Actions Implementation ---
          addItem: (product, quantity = 1) => {
            const { items } = get(); // Get current items array
            const existingItemIndex = items.findIndex(
              (item) => item.product.id === product.id
            );

            let updatedItems;
            if (existingItemIndex > -1) {
              // Product already exists, update quantity
              updatedItems = items.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              );
            } else {
              // Product is new, add it to the cart
              updatedItems = [...items, { product, quantity }];
            }

            // Update the state
            set({ items: updatedItems });
            console.log('Cart updated:', updatedItems);
          },

          removeItem: (productId) => {
            const { items } = get();
            const updatedItems = items.filter(
              (item) => item.product.id !== productId
            );
            set({ items: updatedItems });
            console.log('Item removed:', productId, updatedItems);
          },

          updateQuantity: (productId, quantity) => {
            const { items } = get();
            // Ensure quantity is at least 1, otherwise remove the item
            if (quantity < 1) {
              get().removeItem(productId); // Use existing removeItem action
              return;
            }

            const updatedItems = items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            );
            set({ items: updatedItems });
            console.log('Quantity updated:', productId, quantity, updatedItems);
          },

          clearCart: () => {
            set({ items: [] });
            console.log('Cart cleared');
          },

          toggleCart: () => {
             const { isOpen } = get();
             console.log('Toggling cart, current state:', isOpen);
             set({ isOpen: !isOpen });
          },
        }),
        {
          // --- Persistence Configuration ---
          name: 'cart-storage', // Unique name for localStorage key
          storage: createJSONStorage(() => localStorage), // Use localStorage
        }
      )
    );

    // --- Helper function/selector to calculate total price (can be called from components) ---
    export const selectCartTotal = (state: CartState): number => {
        return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    // --- Helper function/selector to calculate total items count ---
     export const selectTotalItems = (state: CartState): number => {
         return state.items.reduce((total, item) => total + item.quantity, 0);
     };

    