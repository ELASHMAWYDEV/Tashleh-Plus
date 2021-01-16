import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);
const AuthContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={null}>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};
