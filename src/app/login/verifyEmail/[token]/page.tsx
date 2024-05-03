"use client";
import React, { useEffect, useState } from "react";
import { useApiHandler } from "@/utils/api";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function VerifyEmailPage() {
  const pathname = usePathname();
  const [status, setStatus] = useState("loading");
  const { verifyEmail } = useAuth();
  const router = useRouter();

  const verifyEmails = async () => {
    try {
      const token = pathname.split("/")[3];

      console.log("Token:", token);
      await verifyEmail(token);
      setStatus("success");
      router.push("/");
    } catch (error) {
      console.error("Error verifying email:", error);
      setStatus("error");
    }
  };
  verifyEmails();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 shadow-xl rounded-lg p-8 max-w-sm w-full text-center"
      >
        {status === "loading" && (
          <p className="text-lg text-gray-600">Loading...</p>
        )}
        {status === "success" && (
          <div>
            <p className="text-lg font-bold text-green-500">
              Email verification successful!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Thank you for confirming your email address.
            </p>
          </div>
        )}
        {status === "error" && (
          <div>
            <p className="text-lg font-bold text-red-500">
              Error during email verification.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Prøv linken igjen, eller kontakt gruppe 11 for assistanse.
            </p>
          </div>
        )}
        {status === "invalid" && (
          <div>
            <p className="text-lg font-bold text-yellow-500">
              Invalid request.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              No token provided. Please use a valid link from your email.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default VerifyEmailPage;
