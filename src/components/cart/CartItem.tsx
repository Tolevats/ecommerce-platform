"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType, useCartStore } from "@/store/cartStore"; // Import type and store hook
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useShallow } from "zustand/shallow"; // Import shallow for Zustand
//import { FaRegCircleXmark } from "react-icons/fa6"; 

interface CartItemProps {
  item: CartItemType;
}

// --- Simulate an async API call for removing item ---
// In a real app, this would be my actual API call function
const simulateRemoveItemAPI = async (productId: number): Promise<{ success: boolean }> => {
  console.log(`Simulating API call to remove product ID: ${productId}`);
  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 750));
  
  // Simulate potential failure (10% chance)
  if (Math.random() < 0.1) {
    console.error(`Simulated API failure for removing product ID: ${productId}`);
    throw new Error(`Simulated server error removing item ${productId}`);}
  console.log(`Simulated API success for removing product ID: ${productId}`);
  return { success: true };
};
// --- End Simulation ---

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const queryClient = useQueryClient();

  // Get Zustand actions needed for optimistic update and direct calls
  const { updateQuantity: updateQuantityInStore, removeItem: removeItemFromStore } = useCartStore(useShallow((state) => ({
    updateQuantity: state.updateQuantity,
    removeItem: state.removeItem,
  })));

  // === Optimistic Remove Item Mutation  ===
  const { mutate: removeItemMutate, isPending: isRemoving } = useMutation({
    mutationFn: simulateRemoveItemAPI, // The async function to call
    // --- Optimistic Update Logic ---
    onMutate: async (productIdToRemove) => {
      console.log("Optimistic Remove: Starting mutation for", productIdToRemove);
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      // Snapshot the previous value
      const previousCartItems = queryClient.getQueryData<CartItemType[]>(["cart"]);
      console.log("Optimistic Remove: Snapshotting previous cart items", previousCartItems);
      /* // Snapshot the previous state (entire cart items state from Zustand)
      const previousCartItems = useCartStore.getState().items;
      console.log("Optimistic Remove: Snapshotting previous items", previousCartItems);
       */
      // Optimistically update to the new value
      queryClient.setQueryData<CartItemType[]>(["cart"], (oldCartItems) => {
        if (!oldCartItems) return [];
        return oldCartItems.filter((item) => item.product.id !== productIdToRemove);
      });
      console.log("Optimistic Remove: Store updated optimistically", removeItemFromStore(productIdToRemove)); // Optimistically immediate update Zustand store
      // Return a context object with the previous value
      return { previousCartItems };
    },
    // --- Error Handling ---
    onError: (err, productIdToRemove, context) => {
      console.error("Optimistic Remove: Mutation failed", err);
      if (context?.previousCartItems) {
        console.log("Optimistic Remove: Rolling back state to", context.previousCartItems);
        useCartStore.setState({ items: context.previousCartItems }); // Restore Zustand state
      }
      toast.error(`Failed to remove ${item.product.title.substring(0, 20)}...`);
    },
    // --- Success / Cleanup ---
    onSuccess: (data, productIdToRemove) => {
      console.log("Optimistic Remove: Mutation succeeded for", productIdToRemove);
      toast.success(`${item.product.title.substring(0, 20)}... removed.`);
      // Invalidate queries if the cart state was also fetched from server
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: (data, error, productIdToRemove) => {
      console.log("Optimistic Remove: Mutation settled for", productIdToRemove);
    },
  });
  // --- End Remove Item Mutation ---

  // === Update Quantity Mutation ===
  const { mutate: updateQuantityMutate, isPending: isUpdatingQty } =
    useMutation({
      // Mutation function wraps the synchronous Zustand action
      mutationFn: async (variables: {
        productId: number;
        quantity: number;
      }) => {
        const { productId, quantity } = variables;
        try {
          console.log("UpdateQty MutationFn: Updating quantity in Zustand store", productId, quantity);
          updateQuantityInStore(productId, quantity); // Call synchronous Zustand action
          return Promise.resolve(); // Indicate success
        } catch (error) {
          console.error("UpdateQty MutationFn: Error updating quantity", error);
          return Promise.reject(error); // Indicate failure
        }
      },
      onSuccess: (data, variables) => {
        console.log("UpdateQty Mutation: Success for", variables.productId, "to quantity", variables.quantity);
        // Add a success feedback
        toast.success(`Quantity updated for ${item.product.title.substring(0, 20)}...`);
      },
      onError: (error, variables) => {
        console.error("UpdateQty Mutation: Error", error);
        // Show error for quantity change
        toast.error(`Failed to update quantity for ${variables}`);
      },
    });
  // --- End Update Quantity Mutation ---

  // --- Event Handlers ---
// Using the direct Zustand action for quantity updates.
// // Doesn't typically need optimistic handling unless it involves an API call.
  const handleQuantityChange = (newQuantity: number) => {
    // Trigger the update quantity mutation
    updateQuantityMutate({ productId: item.product.id, quantity: newQuantity });
  };

  const handleRemove = () => {
    // Trigger the remove item mutation
    removeItemMutate(item.product.id);
  };
  // --- End Event Handlers ---

  const subtotal = item.product.price * item.quantity;
  const isMutating = isRemoving || isUpdatingQty; // Check if any mutation is pending

  return (
    <li className="flex py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      {/* Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 relative bg-gray-50 dark:bg-gray-800">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="80px"
          className="p-1"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/80x80/e2e8f0/9ca3af?text=N/A`;
          }}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          {/* Title and Price */}
          <div className="flex justify-between text-base font-medium text-text-light dark:text-text-dark">
            <h3>
              <Link
                href={`/products/${item.product.id}`}
                className="hover:underline"
              >
                {item.product.title.length > 35
                  ? `${item.product.title.substring(0, 35)}...`
                  : item.product.title}
              </Link>
            </h3>
            <p className="ml-4 whitespace-nowrap">${subtotal.toFixed(2)}</p>
          </div>
          {/* Unit Price */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ${item.product.price.toFixed(2)} each
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1} // Disable decrement at 1
              className="px-2 py-1 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md"
              aria-label="Decrease quantity"
            >
              {/* <Minus size={16} /> */} -
            </button>
            <span className="px-3 py-1 text-gray-900 dark:text-gray-100 border-x border-gray-300 dark:border-gray-600">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isMutating}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md"
              aria-label="Increase quantity"
            >
              {/* <Plus size={16} /> */} +
            </button>
          </div>

          {/* Remove Button */}
          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              disabled={isMutating}
              className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary text-xs"
              aria-label="Remove item"
            >
              {/* <X size={16} className="inline mr-1" /> */}
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
