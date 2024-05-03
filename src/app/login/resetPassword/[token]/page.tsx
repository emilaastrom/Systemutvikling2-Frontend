"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const router = useRouter();
  const pathname = usePathname();
  const token = pathname.split("/")[3];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    if (!password) {
      setError("Password is required");
      setStatus("idle");
      return;
    }

    try {
      await resetPassword(password, token);
      setStatus("success");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error verifying email:", error);
      setStatus("error");
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-xl shadow-lg"
      >
        <h1 className="text-xl font-bold text-black text-center">
          Reset Password
        </h1>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500  text-center"
          >
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Skriv inn ditt nye passord"
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-black hover:bg-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <span
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;
