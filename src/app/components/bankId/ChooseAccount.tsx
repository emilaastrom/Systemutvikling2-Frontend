"use client";

import React, { useState } from "react";
import AccountSelect from "@/app/components/settings/AccountSelect";

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

const ChooseAccount = () => {
  const [selectedAccounts, setSelectedAccounts] = useState({});

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-black">
        Choose Your Account
      </h1>
      <AccountSelect
        accounts={accounts}
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />
    </div>
  );
};

export default ChooseAccount;
