"use client";
import React, { useState, useEffect } from "react";
import AccountSelect from "@/app/components/settings/AccountSelect";
import { useApiHandler } from "@/utils/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ChooseAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccounts, setSelectedAccounts] = useState({});
  const [error, setError] = useState(null);
  const apiHandler = useApiHandler();
  const Router = useRouter();
  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await apiHandler("bank", "get", "/getAccounts");
        if (response.data) {
          console.log("response.data", response.data);
          setAccounts(
            response.data.map((account) => ({
              id: account.bban,
              number: account.bban,
              name: account.name,
              ownerName: account.ownerName,
              type: account.name,
            }))
          );
        }
        console.log("Fetched accounts:", response.data);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmission = async () => {
    if (!selectedAccounts["From"] || !selectedAccounts["To"]) {
      setError("You must select both an account for spending and saving");
      return;
    }
    try {
      console.log("Selected accounts:", selectedAccounts);

      const response = await apiHandler("bank", "post", "/setAccounts", {
        from: selectedAccounts["From"],
        to: selectedAccounts["To"],
      });

      if (response.status === 200) {
        console.log("Successfully set accounts");
        Router.push("/bankId/customizeexperience");
      } else {
        console.error("Failed to set accounts:", response.data);
        setError("Failed to set accounts");
      }
    } catch (error) {
      console.error("Failed to set accounts:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-black">
          Loading Your Accounts...
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="w-10 h-10 border-t-4 border-b-4 border-green-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen">
      <div className="w-2/3 text-center mt-12">
        <h1 className="text-2xl font-semibold mb-3 text-black">
          Choose Your Account
        </h1>
        <p className="text-lg font-mono text-gray-700 mb-3 ">
          Her kan du velge hvilke kontoer du ønsker å bruke. Velg en konto for
          overføring, og en konto for sparing
        </p>
      </div>
      <AccountSelect
        accounts={accounts}
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />
      <div className="mb-24 text-center">
        <button
          className="mt-6 bg-primary-light text-white font-semibold px-4 py-2  mb-3 rounded-lg"
          onClick={handleSubmission}
        >
          Velg kontoer
        </button>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAccount;
