import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!userId) {
      setCartCount(0);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5145/api/cart/${userId}`);
      const count = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
