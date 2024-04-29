import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomizeExperience = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState("EZ");
    const challenges = [
      { id: 1, name: "Kaffe", emoji: "☕" },
      { id: 2, name: "Abonnementer", emoji: "📦" },
      { id: 3, name: "Klær", emoji: "👗" },
      { id: 4, name: "Pengespill", emoji: "🎰" },
      { id: 5, name: "Takeaway", emoji: "🍕" },
      { id: 6, name: "Drinks", emoji: "🍺" },
    ];
    const [selectedChallenges, setSelectedChallenges] = useState(new Set());
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);
  
    const toggleChallenge = (id) => {
      setSelectedChallenges(prev => {
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
      <div className="flex flex-col items-center justify-center text-black p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Tilpass din spareopplevelse</h1>
          <div className="flex space-x-2 justify-center mb-8">
            {["Enkel", "Medium", "Vanskelig"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`py-2 px-4 rounded-xl font-mono ${
                  selectedDifficulty === difficulty
                    ? "bg-green-500 text-white "
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
                className={`cursor-pointer p-2 border rounded-lg overflow-x-hidden ${
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

export default CustomizeExperience;
