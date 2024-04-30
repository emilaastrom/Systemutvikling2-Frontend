import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

  const challenges = [
    { id: 1, name: "Snus", emoji: "🚬" },       // Assuming emoji representation
    { id: 2, name: "Brus", emoji: "🥤" },
    { id: 3, name: "Uteliv", emoji: "🌃" },
    { id: 4, name: "Klær", emoji: "👗" },       // Same as in the original list
    { id: 5, name: "Kaffe", emoji: "☕" },      // Same as in the original list
    { id: 6, name: "Takeout", emoji: "🥡" },
    { id: 7, name: "Pengespill", emoji: "🎰" },   // Same as "Pengespill" in the original list
    { id: 8, name: "Kino", emoji: "🎬" },
    { id: 9, name: "Snop", emoji: "🍬" }
  ];

    return (
      <div className="flex flex-col items-center justify-center text-black p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-semibold text-2xl mb-4 dark:text-white">Sparepreferanser</h1>
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
