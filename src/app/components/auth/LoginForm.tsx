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
    const { login } = useAuth();
    const router = useRouter();

    const apiHandler = useApiHandler();

    const getStatus = async () => {
        const req = await apiHandler("user", "get", "/getUserStatus");
        console.log(req);
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try {
            await login(username, password);

            const req = await apiHandler("user", "get", "/getUserStatus");
            if (req.data.firstLogin) {
                router.push("/bankId");
            } else if (req.data.hasConnectedBankAccount) {
                router.push("/connectBankAccount");
            } else if (req.data.hasCustomizedGoals) {
                router.push("/customizeGoals");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Feil brukernavn eller passord.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col ">
            <h1 className="text-md underline font-bold mb-2 text-black">
                Logg Inn
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
            <input
                type="username"
                placeholder="Brukernavn"
                className="border-2 rounded-md border-primary-light text-black py-2 px-4 mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Passord"
                className="border-2 rounded-md border-primary-light text-black py-2 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <p
                onClick={() => setFormIndex(2)}
                className="text-primary-dark hover:underline mt-1 mb-6 cursor-pointer"
            >
                Glemt passord?
            </p>
            <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
                disabled={isLoading}
            >
                {isLoading ? "Logger inn..." : "Logg Inn"}
            </button>
            <p className="text-gray-600 my-2">
                Har du ikke en konto?{" "}
                <span
                    onClick={() => setFormIndex(1)}
                    className="text-primary-dark hover:underline cursor-pointer"
                >
                    Registrer deg her.
                </span>
            </p>
        </form>
    );
};

export default LoginForm;
