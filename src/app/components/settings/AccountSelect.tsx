import React from "react";
import { motion } from "framer-motion";

import { Account, SelectedAccounts } from "@/util/types/BankTypes";
interface AccountSelectProps {
  accounts: Account[];
  selectedAccounts: SelectedAccounts;
  setSelectedAccounts: React.Dispatch<React.SetStateAction<SelectedAccounts>>;
}

const AccountSelect: React.FC<AccountSelectProps> = ({
  accounts,
  selectedAccounts,
  setSelectedAccounts,
}) => {
  const handleSelect = (account: Account, option: keyof SelectedAccounts) => {
    setSelectedAccounts((prev) => ({
      ...prev,
      From:
        option === "From"
          ? prev.From?.id === account.id
            ? null
            : account
          : prev.From,
      To:
        option === "To"
          ? prev.To?.id === account.id
            ? null
            : account
          : prev.To,
    }));
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
                selectedAccounts.From?.id === account.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelect(account, "From")}
            >
              Spending
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedAccounts.To?.id === account.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelect(account, "To")}
            >
              Savings
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AccountSelect;
