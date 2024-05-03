"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CustomizeExperience from "../settings/CustomizeExperience";

const newUserConfig = () => {


    return (
        <CustomizeExperience selectedDifficulty={""} setSelectedDifficulty={function (difficulty: string): void {
            throw new Error("Function not implemented.");
        } } selectedChallenges={[]} setSelectedChallenges={function (challenges: string[]): void {
            throw new Error("Function not implemented.");
        } }            
        />
    );
};

export default newUserConfig;
