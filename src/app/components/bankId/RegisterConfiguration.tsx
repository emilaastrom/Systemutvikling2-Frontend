"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CustomizeExperience from "../settings/CustomizeExperience";

const newUserConfig = () => {
    return (
        <CustomizeExperience
            setSelectedDifficulty={undefined}
            setSelectedChallenges={undefined}
        />
    );
};

export default newUserConfig;
