"use client";
import React from "react";
import CustomizeExperience from "../../components/settings/CustomizeExperience";
function Page() {
  return (
    <div>
      <CustomizeExperience
        setSelectedDifficulty={undefined}
        setSelectedChallenges={undefined}
      />
    </div>
  );
}

export default Page;
