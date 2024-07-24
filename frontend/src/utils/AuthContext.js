import React, { createContext, useState, useContext } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const login = (token) => {
    cookies.set("jwt_athorization", token, { path: "/", expires: new Date(Date.now() + 2592000) });
    setUser(true); // O puedes decodificar el token y extraer más información del usuario
  };

  const logout = () => {
    cookies.remove("jwt_athorization");
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!cookies.get("jwt_athorization");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
