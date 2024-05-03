"use client";
import React from "react";
import CustomizeExperience from "../../components/settings/CustomizeExperience";
function Customize() {
  return (
    <div className="h-screen bg-white">
      <div className="h-2/3 ">
        <div className="pt-48">
          <CustomizeExperience
            setSelectedDifficulty={undefined}
            setSelectedChallenges={undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Customize;
