import React, { createContext, useContext, useReducer } from 'react';

// Create a context for managing cart items
const CartItemContext = createContext();

// Define the reducer function for managing cart state
const cartReducer = (state, action) => {
  // Handle state changes based on action type
  switch (action.type) {
    case 'ADD_TO_CART':
      // Add the item to the cartItems array
      return [...state, action.payload];
    case 'INCREMENT':
      // Find the item by itemId and increment selectedAmount
      return state.map(item =>
        item.itemId === action.itemId
          ? { ...item, selectedAmount: item.selectedAmount + 1 }
          : item
      );
    case 'DECREMENT':
      // Find the item by itemId and decrement selectedAmount
      return state.map(item =>
        item.itemId === action.itemId && item.selectedAmount > 0
          ? { ...item, selectedAmount: item.selectedAmount - 1 }
          : item
      );
    default:
      return state;
  }
};

// Create a provider component to manage cart state
export const CartItemProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartItemContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartItemContext.Provider>
  );
};

// Custom hook to easily access cart state and dispatch function
export const useCartItem = () => {
  return useContext(CartItemContext);
};