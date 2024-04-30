"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await login(username, password);
      router.push("/bankId");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <h1 className="text-md underline font-bold mb-2 text-black">Login</h1>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mb-2"
        >
          {errorMessage}
        </motion.div>
      )}
      <input
        type="username"
        placeholder="username"
        className="border border-[#06DD36] text-black rounded-md py-2 px-4 mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded-md border-[#06DD36] text-black py-2 px-4 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
