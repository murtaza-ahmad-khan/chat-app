import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  let localStorageToken = localStorage.getItem("token");
  let localStorageUser = localStorage.getItem("user");

  if (localStorageToken) {
    localStorageToken = JSON.parse(localStorageToken);
  }

  if (localStorageUser) {
    localStorageUser = JSON.parse(localStorageUser);
  }

  const [state, setState] = useState({
    user: localStorageUser,
    token: localStorageToken,
  });

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
}
