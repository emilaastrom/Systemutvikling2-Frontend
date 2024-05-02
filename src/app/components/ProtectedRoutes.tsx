"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isTokenValid } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isTokenValid()) {
      router.push("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
