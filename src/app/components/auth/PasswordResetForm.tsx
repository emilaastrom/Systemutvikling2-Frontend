"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useApiHandler } from "@/utils/api";

const LoginForm = ({
  setFormIndex,
}: {
  setFormIndex: (index: number) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(username);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="flex flex-col items-center justify-center p-6 bg-green-200 rounded-xl text-black text-center "
      >
        <svg
          className="w-16 h-16 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        E-posten med tilbakestilling av passord er sendt.
        <button
          onClick={() => setFormIndex(0)}
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300 mt-4"
        >
          Gå til Login
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-16"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="text-md underline font-bold mb-2 text-black text-center">
        Glemt Passord
      </h1>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mb-2"
        >
          {errorMessage}
        </motion.div>
      )}
      <p className="mb-4 text-center">
        Skriv inn e-posten din, så sender vi deg en e-post med instruksjoner for
        å tilbakestille passordet ditt.
      </p>
      <input
        type="username"
        placeholder="E-postadresse"
        className="border-2 rounded-md border-primary-light text-black py-2 px-4 mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Sender Epost..." : "Send Epost"}
      </button>
      <p className="text-gray-600 my-2">
        Husker du passordet?{" "}
        <span
          onClick={() => setFormIndex(0)}
          className="text-primary-dark hover:underline cursor-pointer"
        >
          Logg inn her.
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
