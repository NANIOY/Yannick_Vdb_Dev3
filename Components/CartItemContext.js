import React, { createContext, useContext, useReducer } from 'react';

const CartItemContext = createContext();

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
    // Add other cases for other actions if needed
    default:
      return state;
  }
};

export const CartItemProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartItemContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartItem = () => {
  return useContext(CartItemContext);
};
