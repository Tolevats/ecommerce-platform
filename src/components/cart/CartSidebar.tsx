"use client"; // Needs client-side hooks and state

import React, { useMemo } from 'react';
import { useCartStore, selectCartTotal, selectTotalItems } from '@/store/cartStore';
import CartItem from './CartItem'; // Import the CartItem component

/*
 * Sidebar component to display the shopping cart contents.
 */
const CartSidebar: React.FC = () => {
  // Get state and actions from the Zustand store
  const { isOpen, items, toggleCart, clearCart } = useCartStore((state) => ({
    isOpen: state.isOpen,
    items: state.items,
    toggleCart: state.toggleCart,
    clearCart: state.clearCart,
  }));

  // Calculate total price using the selector function
  const totalPrice = useCartStore(selectCartTotal);
  // Calculate total items using the selector function
  const totalItems = useCartStore(selectTotalItems);


  // Memoize the items list to prevent unnecessary re-renders of CartItem components
  // if other parts of the state (like isOpen) change.
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleCart} // Close cart when clicking overlay
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="cart-heading" className="text-lg font-medium text-gray-900 dark:text-white">
            Shopping Cart ({totalItems})
          </h2>
          <button
            type="button"
            className="-m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            {/* <X className="h-6 w-6" /> */} X
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          {memoizedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
               {/* <ShoppingCart size={48} className="text-gray-400 dark:text-gray-500 mb-4" /> */}
               <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
               <button
                  onClick={toggleCart} // Close cart
                  className="mt-4 text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
                >
                  Continue Shopping
               </button>
            </div>
          ) : (
            <ul role="list" className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
              {memoizedItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Summary */}
        {memoizedItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-6">
             <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
               <p>Subtotal</p>
               <p>${totalPrice.toFixed(2)}</p>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Shipping and taxes calculated at checkout.</p>
             <div className="mt-6">
               <button
                 onClick={() => alert('Checkout not implemented yet!')} // Placeholder action
                 className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark transition-colors"
               >
                 Checkout
               </button>
             </div>
             <div className="mt-4 flex justify-center text-center text-sm">
               <button
                 type="button"
                 className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 mr-4"
                 onClick={() => {
                   if (window.confirm('Are you sure you want to clear the cart?')) {
                     clearCart();
                   }
                 }}
               >
                 Clear Cart
               </button>
               <button
                 type="button"
                 className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
                 onClick={toggleCart}
               >
                 Continue Shopping
                 <span aria-hidden="true"> &rarr;</span>
               </button>
             </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
