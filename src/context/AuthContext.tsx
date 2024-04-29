"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { AuthContextType, AuthState, Token, User } from "../context/UserType";

const AuthContext = createContext<AuthContextType | null>(null);

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null });

  const login = async (username: string, password: string) => {
    const response = await fetch("https://ep.sysdevservices.tech/auth/login", {
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
    const response = await fetch("https://ep.sysdevservices.tech/register", {
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
    console.log("------------------------------------");

    console.log("aaa", username, firstName, lastName, password, email, phone);
    console.log("------------------------------------");

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
      `https://ep.sysdevservices.tech/auth/auth/verify?token=${code}`,
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
      value={{ ...auth, login, logout, register, verifyEmail }}
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
