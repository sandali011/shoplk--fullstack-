import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find(item => item.id === action.product.id);
      if (exists) {
        return state.map(item =>
          item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      
      return [...state, { ...action.product, qty: 1 }];
    }
    case "CHANGE_QTY":
      return state
        .map(item =>
          item.id === action.id ? { ...item, qty: item.qty + action.amount } : item
        )
        .filter(item => item.qty > 0); 
    case "REMOVE":
      return state.filter(item => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}