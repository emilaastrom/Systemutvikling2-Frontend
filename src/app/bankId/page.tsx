"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AccountSelect from "@/app/components/settings/AccountSelect";
import BankIdLogin from "../components/bankId/BankIdLogin";
import CustomizeExperience from "../components/bankId/CustomizeExperience";
function Page() {
  const [nr, setNr] = useState(1);
  return (
    <div>
      {nr === 1 && <BankIdLogin />}
      {nr === 3 && <CustomizeExperience />}

      <button onClick={() => setNr(nr - 1)}>prev</button>
      <button onClick={() => setNr(nr + 1)}>Next</button>
    </div>
  );
}

export default Page;
