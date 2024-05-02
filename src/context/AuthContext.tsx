"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { AuthContextType, AuthState, Token, User } from "../context/UserType";
import { useRouter } from "next/router";
const AuthContext = createContext<AuthContextType | null>(null);
import { jwtDecode } from "jwt-decode";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null });

  const login = async (username: string, password: string) => {
    const response = await fetch(baseURL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response body once
      console.log(data); // Log the data

      localStorage.setItem("token", data.token);
      setAuth({ token: data.token });
    } else {
      throw new Error("Failed to login");
    }
  };

  const isTokenValid = () => {
    try {
      const token = auth.token;
      if (!token) return false;

      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const buffer = 300;

      if (exp < currentTime) {
        return false;
      } else if (exp - currentTime < buffer) {
        refreshToken();
      }
      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token });
    } catch (error) {
      console.error("Failed to refresh token");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null });
  };

  const register = async (
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string
  ) => {
    const response = await fetch(baseURL + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        password,
        email,
        phone,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token });
    } else {
      throw new Error("Failed to register");
    }
  };

  const verifyEmail = async (code: string) => {
    const response = await fetch(
      baseURL + `/auth/verify?token=${code}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token });
    } else {
      throw new Error("Verification failed.");
    }
  };

  // Load the user and token from local storage
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (tokenString) {
      const token: Token = tokenString;
      setAuth({ token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...auth, login, logout, register, verifyEmail, isTokenValid }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
