"use client";
import React, { useCallback, useState, useEffect } from "react";
import CustomizeExperience from "../../components/settings/CustomizeExperience";
import { useApiHandler } from "../../../utils/api";
import { useRouter } from "next/navigation";


function Customize() {
    const [difficultyLevel, setDifficultyLevel] = useState<string>("");
    const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

    const [initialDifficultyLevel, setInitialDifficultyLevel] = useState("");
    const [tempChallenges, setTempChallenges] = useState<string[]>([]);

    const apiHandler = useApiHandler();

    const FetchUser = useCallback(async () => {
        try {
            const fetched = await apiHandler("user", "get", "/getUser");

            setDifficultyLevel(fetched.data.difficultyLevel);
            setInitialDifficultyLevel(fetched.data.difficultyLevel);

            if (fetched.data.options) {
                setSelectedChallenges([...fetched.data.options]);
                setTempChallenges([...fetched.data.options]);
            } else {
                console.warn(
                    "No challenges found in user data",
                    fetched.data.options
                );
            }
        } catch (error) {
            console.error("Error fetching data from API: ", error);
        }
    }, [apiHandler]);

    const handleDifficultyChange = (difficulty) => {
        setDifficultyLevel(difficulty);
    };

    useEffect(() => {
        if (!selectedChallenges) {
            FetchUser();
        }
    });



    const router = useRouter();

    const handleStartClick = () => {
      router.push("/dashboard");
    };


    return (
        <div className="flex p-4 h-screen justify-center items-center content-center bg-white w-screen">
            <div className="flex flex-col h-2/3 justify-center items-center">
                <div className="pt-48">
                    {/* <CustomizeExperience
                        selectedDifficulty={`${difficultyLevel}`}
                        setSelectedDifficulty={handleDifficultyChange}
                        selectedChallenges={selectedChallenges}
                        setSelectedChallenges={setSelectedChallenges}
                    /> */}

                    <CustomizeExperience
                        selectedDifficulty={`${difficultyLevel}`}
                        setSelectedDifficulty={handleDifficultyChange}
                        selectedChallenges={undefined}
                        setSelectedChallenges={undefined}
                    />
                </div>
                <button className="button-enticing" onClick={handleStartClick}>Start din Sparesti</button>
            </div>
        </div>
    );
}

export default Customize;
