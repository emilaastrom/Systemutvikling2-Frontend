import { motion } from "framer-motion";
import {MutableRefObject} from "react";

export default function AccountSelect({ accounts, selectedId, setSelectedId }: { accounts: any; selectedId: number; setSelectedId: (id: number) => void; }) {
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="space-y-4">
      {accounts.map((account: any, index: any) => (
        <motion.div
          key={account.id}
          initial={{opacity: 0, x: 100}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.1 * index}}
          className="bg-white rounded-xl border-primary-light border-2 shadow-lg p-3 text-black w-full md:w-96"
        >
          <h2 className="text-lg font-bold">
            Kortnummer: {account.number}
          </h2>
          <p className="text-gray-600">
            Saldo: ${account.balance.toFixed(2)}
          </p>
          <p className="text-gray-600">Type: {account.type}</p>
          <button
            className="mt-4 bg-primary-light hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => handleSelect(account.id)}
            disabled={account.id === selectedId}
          >
            {account.id === selectedId ? "Valgt" : "Velg"}
          </button>
        </motion.div>
      ))}
    </div>
  );
};