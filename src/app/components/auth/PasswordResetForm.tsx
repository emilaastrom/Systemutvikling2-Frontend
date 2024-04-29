"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({setFormIndex}: {setFormIndex: (index: number) => void}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Send password reset email");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" style={{maxWidth: "500px"}}>
      <h1 className="text-md underline font-bold mb-2 text-black">
        Glemt Passord
      </h1>
      {errorMessage && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="text-red-500 mb-2"
        >
          {errorMessage}
        </motion.div>
      )}
      <p className="mb-4">Skriv inn brukernavnet ditt, så sender vi deg en e-post med instruksjoner for å tilbakestille passordet ditt.</p>
      <input
        type="username"
        placeholder="Brukernavn"
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
        Husker du passordet? <span
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
