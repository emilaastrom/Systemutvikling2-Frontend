"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await register(username, firstName, lastName, password, email, phone);
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="text-md underline font-bold mb-2 text-black">Register</h1>
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
        type="text"
        placeholder="First Name"
        className="border border-[#06DD36] text-black rounded-md py-2 px-4 mb-4"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        className="border border-[#06DD36] text-black rounded-md py-2 px-4 mb-4"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border border-[#06DD36] text-black rounded-md py-2 px-4 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        className="border border-[#06DD36] text-black rounded-md py-2 px-4 mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
