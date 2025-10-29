import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // pri mount-u proveri localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const login = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
