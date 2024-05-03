"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AccountSelect from "@/app/components/settings/AccountSelect";
import BankIdLogin from "../components/bankId/BankIdLogin";
import CustomizeExperience from "../components/settings/CustomizeExperience";
function Page() {
  const [nr, setNr] = useState(1);
  return (
    <div className="h-screen">
      {nr === 1 && <BankIdLogin />}
      {nr === 2 && (
        <div className="h-2/3 ">
          <div className="pt-48">
            <CustomizeExperience
              setSelectedDifficulty={undefined}
              setSelectedChallenges={undefined}
            />
          </div>
        </div>
      )}

      <button onClick={() => setNr(nr - 1)}>prev</button>
      <button onClick={() => setNr(nr + 1)}>Next</button>
    </div>
  );
}

export default Page;
