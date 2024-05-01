import React from "react";
import { motion } from "framer-motion";

const AccountSelect = ({ accounts, selectedAccounts, setSelectedAccounts }) => {
  const handleSelect = (id, option) => {
    setSelectedAccounts((prevOptions) => {
      // Reset any previous selection of the same type (From or To)
      const resetSelections = Object.keys(prevOptions).reduce((acc, curr) => {
        if (prevOptions[curr] === option) {
          acc[curr] = "None";
        } else {
          acc[curr] = prevOptions[curr];
        }
        return acc;
      }, {});

      // Set the new selection
      return { ...resetSelections, [id]: option };
    });
  };

  return (
    <div className="space-y-4">
      {accounts.map((account, index) => (
        <motion.div
          key={account.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-white rounded-xl border-primary-light border-2 shadow-lg p-3 text-black w-full md:w-96"
        >
          <h2 className="text-lg font-bold">BBAN Number: {account.number}</h2>
          <p className="text-gray-600">Type: {account.type}</p>
          <p className="text-gray-600">Owner: {account.ownerName}</p>
          <div className="flex space-x-2 mt-2">
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedAccounts[account.id] === "From"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelect(account.id, "From")}
            >
              Saving
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedAccounts[account.id] === "To"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelect(account.id, "To")}
            >
              Spending
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AccountSelect;
