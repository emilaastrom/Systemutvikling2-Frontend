"use client";
import React from "react";
import CustomizeExperience from "../../components/settings/CustomizeExperience";
import { useRouter } from "next/navigation";

function Customize() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/dashboard");
  };
  return (
    <div className="h-screen bg-white">
      <div className="h-2/3 ">
        <div className="pt-48">
          <CustomizeExperience
            setSelectedDifficulty={undefined}
            setSelectedChallenges={undefined}
          />
          <button onClick={handleStart}>Start din sparesti!</button>
        </div>
      </div>
    </div>
  );
}

export default Customize;
