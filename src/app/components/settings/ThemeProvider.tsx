import React, { createContext, useContext, useEffect } from "react";
import ThemeManager from "./ThemeManager";

const ThemeContext = createContext({
  theme: ThemeManager.getCurrentTheme(),
  setTheme: ThemeManager.setTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    ThemeManager.initialize();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: ThemeManager.getCurrentTheme(),
        setTheme: ThemeManager.setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
