import React, { createContext, useState, useEffect } from "react";
import { useBannerTimer } from "../hooks/useBannerTime";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const timeLeft = useBannerTimer();

  // pri mount-u proveri localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    if (storedUserId) setUserId(storedUserId);
    setIsAdmin(storedIsAdmin);
  }, []);

  const login = (userId, isAdmin) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
    setUserId(userId);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setUserId(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAdmin, login, logout, timeLeft }}>
      {children}
    </AuthContext.Provider>
  );
};
