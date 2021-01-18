import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);
const AuthContext = createContext(null);
const LoadingContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);
export const useLoadingContext = () => useContext(LoadingContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoggedIn(eval(localStorage.getItem("loggedIn")));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", `${isLoggedIn}`);
  }, [isLoggedIn]);

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
