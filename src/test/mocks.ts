// mocks.ts

import { createContext, useContext } from 'react';

// Mock implementation of useAuth hook
export const useAuth = () => {
  throw new Error('useAuth must be used within an AuthProvider');
};

// Mock AuthContext
export const AuthContext = createContext(null);

// Custom hook to access AuthContext for testing purposes
export const useMockedAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useMockedAuthContext must be used within an AuthContext.Provider');
  }
  return context;
};
