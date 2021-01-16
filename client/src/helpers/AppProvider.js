import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);
const AuthContext = createContext(null);
const LoadingContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);
export const useLoadingContext = () => useContext(LoadingContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={null}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          {children}
        </LoadingContext.Provider>
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};
