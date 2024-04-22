"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FirstTimeLogin = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Add layout animation for a smoother entrance
      layout
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* Animate logo with a subtle bounce */}
      <motion.img
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        initial={{ y: 20 }} // Start slightly off-screen
        animate={{ y: 0 }} // Bounce back to center
        transition={{ duration: 0.5, ease: "easeInOut" }} // Customize timing and easing
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

      <motion.button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }}
      >
        Log in with BankId
      </motion.button>
    </motion.div>
  );
};

const accounts = [
  {
    id: 1,
    number: "123456789",
    balance: 1000,
    type: "Sparekonto",
  },
  {
    id: 2,
    number: "987654321",
    balance: 5000,
    type: "Brukskonto",
  },
];

function Page() {
  const [nr, setNr] = useState(1);
  return (
    <div>
      {nr === 1 && <FirstTimeLogin />}
      {nr === 2 && <ChooseAccount accounts={accounts} />}
      {nr === 3 && <CustomizeExperience />}

      <button onClick={() => setNr(nr - 1)}>prev</button>
      <button onClick={() => setNr(nr + 1)}>Next</button>
    </div>
  );
}

const ChooseAccount = ({ accounts }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-2xl font-semibold mb-6 text-black">
        Choose Your Account
      </h1>
      <div className="space-y-4">
        {accounts.map((account: any, index: any) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-xl  border-green-300 border-2 shadow-lg p-3 text-black w-full md:w-96"
          >
            <h2 className="text-lg font-bold">
              Account Number: {account.number}
            </h2>
            <p className="text-gray-600">
              Balance: ${account.balance.toFixed(2)}
            </p>
            <p className="text-gray-600">Type: {account.type}</p>
            <button className="mt-4 bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl">
              Select
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CustomizeExperience = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("EZ");
  const challenges = [
    { id: 1, name: "Coffee", emoji: "☕" },
    { id: 2, name: "Subscriptions", emoji: "📦" },
    { id: 3, name: "Clothes", emoji: "👗" },
    { id: 4, name: "Gambling", emoji: "🎰" },
    { id: 5, name: "Takeaway", emoji: "🍕" },
    { id: 6, name: "Beer", emoji: "🍺" },
  ];
  const [selectedChallenges, setSelectedChallenges] = useState(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const toggleChallenge = (id: number) => {
    setSelectedChallenges((prev) => {
      const newSet = new Set(prev);
      if (prev.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }} // Animate opacity based on mount state
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-4">
          Customize Your Budgeting Experience
        </h1>
        <div className="flex space-x-2 justify-center mb-8">
          {["EZ", "Medium", "Hard"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`py-2 px-4 rounded-xl font-mono ${
                selectedDifficulty === difficulty
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`cursor-pointer p-2 border rounded-lg ${
                selectedChallenges.has(challenge.id)
                  ? "bg-green-200 border-green-500"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => toggleChallenge(challenge.id)}
            >
              <span className="text-xl font-mono">{challenge.emoji}</span>
              <span className="ml-2">{challenge.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default Page;
