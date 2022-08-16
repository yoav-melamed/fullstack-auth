import { useState } from "react";
import { createContext } from "react";

const authStore = {
  isLoggedIn: false,
  userToken: null,
};

export const AuthContext = createContext(authStore);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isLoggedIn);
  const [userToken, setUserToken] = useState(authStore.userToken);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userToken, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
