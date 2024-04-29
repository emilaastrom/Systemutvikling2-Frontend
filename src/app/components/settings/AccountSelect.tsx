import { motion } from "framer-motion";

export default function AccountSelect({ accounts, selectedAccounts, setSelectedAccounts }: { accounts: any; selectedAccounts: {}; setSelectedAccounts: (selectedAccounts: {}) => void; }) {

  const handleSelect = (id: number, option: string) => {
    setSelectedAccounts((prevOptions: {[key: number]: string}) => {
      let newOptions = { ...prevOptions, [id]: option };

      if (option === "From" || option === "To") {
        for (let accountId in newOptions) {
          if (Number(accountId) !== id && newOptions[accountId] === option) {
            newOptions[accountId] = 'None';
          }
        }
      }

      return newOptions;
    });
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
          <select
            className="w-full mt-1 border-2 rounded-lg px-4 py-2 bg-background-100 border-primary-light"
            value={selectedAccounts[account.id] || 'None'}
            onChange={(e) => handleSelect(account.id, e.target.value)}
          >
            <option>From</option>
            <option>To</option>
            <option>None</option>
          </select>
        </motion.div>
      ))}
    </div>
  );
};