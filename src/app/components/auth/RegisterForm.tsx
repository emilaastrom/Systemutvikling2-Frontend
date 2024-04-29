"use client";
import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const RegisterForm = ({setFormIndex}: {setFormIndex: (index: number) => void}) => {
  const [formStep, setFormStep] = useState("register"); // 'register' or 'verify'
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    verificationCode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, verifyEmail } = useAuth();
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await register(
        userData.username,
        userData.firstName,
        userData.lastName,
        userData.password,
        userData.email,
        userData.phone
      );
      setFormStep("verify"); // Move to verification step
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed.");
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      await verifyEmail(userData.verificationCode);
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Verification failed.");
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence>
          {formStep === "register" && (
            <motion.form
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              <h1 className="text-md underline font-bold mb-2 text-black">
                Register
              </h1>

              <div className="grid grid-flow-row grid-rows-3 grid-cols-2 gap-x-4">
                <input
                  type="username"
                  placeholder="Brukernavn"
                  name="username"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  placeholder="Passord"
                  name="password"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Fornavn"
                  name="firstName"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Etternavn"
                  name="lastName"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Telefonnummer"
                  name="phone"
                  className="border-2 border-primary-light text-black rounded-md py-2 px-4 mb-4"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Registrerer..." : "Register"}
              </button>
              <p className="text-gray-600 my-2">
                Er du allerede registrert? <span
                  onClick={() => setFormIndex(0)}
                  className="text-primary-dark hover:underline cursor-pointer"
                >
                  Logg inn her.
                </span>
              </p>
            </motion.form>
            )}

          {formStep === "verify" && (
            <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{ scale: 0 }}
            >
              <div className="w-64 h-64 p-8 bg-gray-100 rounded-2xl">
                <h1 className="text-8xl text-center mb-5">🔥</h1>
                <h1 className="text-md text-center font-mono text-black">
                  Du har nå fått en verdifikasjons-token på Epost!
                </h1>
              </div>
              <input
                type="text"
                placeholder="Verification Code"
                name="verificationCode"
                className="border border-[#06DD36] w-40 mt-4 mr-3 text-black rounded-md py-2 px-4 mb-4"
                value={userData.verificationCode}
                onChange={handleChange}
              />

              <button
                onClick={handleVerificationSubmit}
                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                Verify
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mb-2 text-center"
        >
          {errorMessage}
        </motion.div>
      )}
    </div>
  );
};

export default RegisterForm;
