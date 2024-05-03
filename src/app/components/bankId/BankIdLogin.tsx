import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useApiHandler } from "@/utils/api";
import { useRouter } from "next/navigation";

const BankIdLogin = () => {
    const handler = useApiHandler();
    const [loading, setLoading] = useState(false);
    const [pollInterval, setPollInterval] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const req = await handler("bank", "post", "/createConsent");
            router.push(req.data.sca);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
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


  useEffect(() => {
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [pollInterval]);

  */

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            style={{ display: "flex", alignItems: "center" }}
        >
            <motion.svg
                viewBox="0 65.568 500 369.872"
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <image href="/gris.svg" width="100%" height="100%" />
            </motion.svg>

            <motion.h1
                className="text-3xl font-bold text-black text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
            >
                Velkommen til Sparesti!
            </motion.h1>

            <motion.p
                className="text-center text-gray-500  mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
            >
                Benytt BankId for å velge hvilke kontoer du vil spare fra og til
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
                    Logg in med BankId
                </motion.button>
            )}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 mt-4"
                >
                    En feil oppstod. Vennligst prøv igjen.
                </motion.div>
            )}
        </motion.div>
    );
};

export default BankIdLogin;
