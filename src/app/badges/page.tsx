"use client";
import React, { useState } from "react";
import ThemeProvider from "../components/settings/ThemeProvider";
import CustomIcon from "../components/icons/CustomIcon";
import { useApiHandler } from "../../utils/api";

const BadgesPage: React.FC = () => {
  const [goals, setGoals] = useState<number>(0);
  const [challenges, setChallenges] = useState<number>(0);
  const [earned, setEarned] = useState<number>(0);

  const apiHandler = useApiHandler();

  const fetchGoals = async () => {
    console.log("Fetching goal data");
    try {
      const data = await apiHandler("goal", "get", "/getCompletedGoals");
      setGoals(data.data.numCompleted);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEarned = async () => {
    console.log("Fetching earned data");
    try {
      const data = await apiHandler("goal", "get", "/getTotalSaved");
      setEarned(data.data.totalSaved);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchChallenges = async () => {
    console.log("Fetching challenge data");
    try {
      const response = await apiHandler("challenge", "get", "/getNumberOfCompletedChallenges");
      setChallenges(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let goalslevel = "";
  let goalslevelStroke = "";
  let challengeslevel = "";
  let challengeslevelStroke = "";
  let earnedlevel = "";
  let earnedlevelStroke = "";
  fetchEarned();
  fetchGoals();
  fetchChallenges()

  switch (true) {
    case goals >= 5:
      goalslevel = "#edc02b";
      goalslevelStroke = "#9e7d10";
      break;
    case goals >= 2:
      goalslevel = "#C0C0C0";
      goalslevelStroke = "grey";
      break;
    default:
      goalslevel = "#CD7F32";
      goalslevelStroke = "#b5691d";
      break;
  }
  switch (true) {
    case earned >= 10000:
      earnedlevel = "#edc02b";
      earnedlevelStroke = "#9e7d10";
      break;
    case earned >= 1000:
      earnedlevel = "#C0C0C0";
      earnedlevelStroke = "grey";
      break;
    default:
      earnedlevel = "#CD7F32";
      earnedlevelStroke = "#b5691d";
      break;
  }
  switch (true) {
    case challenges >= 20:
      challengeslevel = "#edc02b";
      challengeslevelStroke = "#9e7d10";
      break;
    case challenges >= 5:
      challengeslevel = "#C0C0C0";
      challengeslevelStroke = "grey";
      break;
    default:
      challengeslevel = "#CD7F32";
      challengeslevelStroke = "#b5691d";
      break;
  }
  return (
    <ThemeProvider>
      <main className="dark:bg-slate-700 w-screen pb-0 h-screen flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 text-black gap-8 h-auto md:px-48 px-10 w-screen">
          <div className="flex md:flex-row flex-col justify-center items-center gap-3 md:gap-16 bg-white dark:bg-slate-200 bg-opacity-80 col-span-1 row-span-1 h-auto py-10 rounded-lg shadow-lg">
            <div className="items-center flex-col flex text-center">
              <CustomIcon
                className=""
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke={earnedlevelStroke}
                    fill={earnedlevel}
                    className="w-32 h-32"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              Totalt spart: <br />
              {earned}
            </div>
            <div className="items-center flex-col flex text-center">
              <CustomIcon
                className=""
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke={challengeslevelStroke}
                    fill={challengeslevel}
                    className="w-32 h-32"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              Antall utfordringer:
              <br />
              {challenges}
            </div>
            <div className="items-center flex-col flex text-center">
              <CustomIcon
                className=""
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke={goalslevelStroke}
                    fill={goalslevel}
                    className="w-32 h-32"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              Antall mål: <br />
              {goals}
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default BadgesPage;
