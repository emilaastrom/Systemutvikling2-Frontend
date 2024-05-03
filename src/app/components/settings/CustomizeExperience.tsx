import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApiHandler } from "../../../utils/api";
import { Fira_Sans_Extra_Condensed } from "next/font/google";

interface CustomizeExperienceProps {
    selectedDifficulty: string; // Assuming it should be a string
    setSelectedDifficulty: (difficulty: string) => void; // Assuming it sets a string
    selectedChallenges: string[]; // Already seems to be in use
    setSelectedChallenges: (challenges: string[]) => void; // Assuming it sets an array of strings
}

const languageMapping = {
    EASY: "Enkel",
    MEDIUM: "Medium",
    HARD: "Vanskelig",
};

const customNameMapping = {
    Snus: "Snus",
    Brus: "Brus",
    Uteliv: "Uteliv",
    Klær: "Klær",
    Kaffe: "Kaffe",
    Takeout: "Mat",
    Gambling: "Pengespill",
    Kino: "Kino",
    Snop: "Snop",
};

const CustomizeExperience: React.FC<CustomizeExperienceProps> = ({
    selectedDifficulty: parentSelectedDifficulty = "EASY",
    setSelectedDifficulty,
    selectedChallenges: parentSelectedChallenges = [],
    setSelectedChallenges,
}) => {
    const challenges = [
        { id: 1, name: "Snus", emoji: "🚬" },
        { id: 2, name: "Brus", emoji: "🥤" },
        { id: 3, name: "Uteliv", emoji: "🌃" },
        { id: 4, name: "Klær", emoji: "👗" },
        { id: 5, name: "Kaffe", emoji: "☕" },
        { id: 6, name: "Takeout", emoji: "🥡" },
        { id: 7, name: "Gambling", emoji: "🎰" },
        { id: 8, name: "Kino", emoji: "🎬" },
        { id: 9, name: "Snop", emoji: "🍬" },
    ];

    const [isMounted, setIsMounted] = useState(false);
    const apiHandler = useApiHandler();
    const [tempOptions, setTempOptions] = useState<string[]>([]);
    const [tempDifficulty, setTempDifficulty] = useState<string>("");

    const putDifficulty = async (difficulty) => {
        const diffJSON = JSON.stringify({
            defaultDifficulty: difficulty,
        });
        try {
            await apiHandler("user", "put", "/updateUser", {
                defaultDifficulty: difficulty,
            });
            setTempDifficulty(difficulty);
        } catch (error) {
            console.error(error);
        }
    };

    const putChallengeOptions = async (options) => {
        const optionsJSON = JSON.stringify({
            options: options,
        });

        try {
            await apiHandler("user", "put", "/updateUser", optionsJSON);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
      const fetchUserData = async () => {
            if (tempOptions.length < 1) {
                try {
                    const userData = await apiHandler(
                        "user",
                        "get",
                        "/getUser"
                    );
                    const userOptions = userData.data.options;
                    setTempOptions([...userOptions]);

                    if (!tempDifficulty) {
                        setTempDifficulty(userData.data.defaultDifficulty);
                    }

                    if (!tempOptions) {
                        setTempOptions([...userOptions]);
                        // putChallengeOptions([...userOptions]);
                    }
                } catch (error) {
                    console.error("Error fetching user options:", error);
                }
            }
        };

        if (
            !["EASY", "MEDIUM", "HARD"].includes(parentSelectedDifficulty) ||
            parentSelectedChallenges === null ||
            parentSelectedChallenges === undefined
        ) {
            fetchUserData();
        }

        setIsMounted(true);
        return () => setIsMounted(false);
    }, [parentSelectedDifficulty, apiHandler]);

    const toggleChallenge = (item) => {
        let temp = item.toUpperCase();
        const index = tempOptions.indexOf(temp);
        const indexParent = parentSelectedChallenges.indexOf(temp);

        if (index !== -1 && tempOptions.length === 1) {
            console.error("At least one option must be clicked.");
            return;
        }

        if (index !== -1) {
            tempOptions.splice(index, 1);
        } else {
            console.log(item, "not added, adding it now");
            tempOptions.push(temp);
        }

        if (indexParent !== -1) {
            console.log(item, "already added, removing it now");
            parentSelectedChallenges.splice(indexParent, 1);
        } else {
            parentSelectedChallenges.push(temp);
        }

        handleSetChallenges([...tempOptions]);
    };

    const handleSetChallenges = (challenges) => {
        if (setSelectedChallenges) {
            setSelectedChallenges(challenges);
        } else {
            putChallengeOptions(challenges);
        }
    };

    const handleSetDifficulty = (difficulty) => {
        putDifficulty(difficulty);
    };

    return (
        <div className="flex flex-col items-center justify-center text-black px-4 ">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isMounted ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="font-regular text-lg text-black mb-4 dark:text-white">
                    Hva slags utfordringer ønsker du?
                </h1>

                {/* Challenge Selection */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {challenges.map((challenge) => (
                        <motion.div
                            key={challenge.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`cursor-pointer p-2 border rounded-lg overflow-x-hidden ${
                                parentSelectedChallenges.includes(
                                    challenge.name.toUpperCase()
                                )
                                    ? "bg-green-200 border-green-500"
                                    : "bg-white border-gray-300"
                            }`}
                            onClick={() => toggleChallenge(challenge.name)}
                        >
                            <span className="text-xl font-mono">
                                {challenge.emoji}
                            </span>
                            <span className="ml-2">
                                {customNameMapping[challenge.name]}
                            </span>
                        </motion.div>
                    ))}
                </div>
                {/* Selected Difficulty Buttons */}
                <p className="pt-8 text-lg pb-4 dark:text-white">
                    Nivå på nye utfordringer:
                </p>
                <div className="flex space-x-2 justify-center">
                    {["EASY", "MEDIUM", "HARD"].map((difficulty) => (
                        <button
                            key={difficulty}
                            onClick={() => handleSetDifficulty(difficulty)}
                            className={`py-2 px-4 rounded-xl font-mono ${
                                tempDifficulty === `${difficulty}`
                                    ? "bg-green-500 text-white dark:text-black" // Active button styling
                                    : "bg-gray-200 font-normal" // Inactive button styling
                            }`}
                        >
                            {languageMapping[difficulty]}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default CustomizeExperience;
