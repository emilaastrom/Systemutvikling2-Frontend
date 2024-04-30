import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useApiHandler } from "@/utils/api";
import { useRouter } from "next/navigation";
const BankIdLogin = () => {
  const handler = useApiHandler();
  const [loading, setLoading] = useState(false);
  const [pollInterval, setPollInterval] = useState(null);
  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    const req = await handler("bank", "post", "/createConsent");
    console.log(req.status);
    if (req) {
      router.push(req);
    } else console.log(req.status);
  };

  /*
  const startPolling = () => {
    const interval = setInterval(async () => {
      const req = await handler("bank", "get", "/getStatus");
      console.log(req);
      if (req && ["received", "rejected", "accepted"].includes(req)) {
        clearInterval(interval);
        setPollInterval(null);
        setLoading(false);
      }
    }, 3000); // Polls every 3 seconds
    setPollInterval(interval);
  };
*/

  useEffect(() => {
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [pollInterval]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      style={{ display: "flex", alignItems: "center" }}
    >
      <motion.img
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.h1
        className="text-3xl font-bold text-black text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
      >
        Welcome to the Platform!
      </motion.h1>

      <motion.p
        className="text-center text-gray-500  mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
      >
        To start your Sparing journey, please log in with BankId
      </motion.p>

      {loading ? (
        <motion.div
          className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        ></motion.div>
      ) : (
        <motion.button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleLogin}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }}
        >
          Log in with BankId
        </motion.button>
      )}
    </motion.div>
  );
};

export default BankIdLogin;
