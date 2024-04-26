'use client'
import React, { useState, useEffect } from "react";
import PathSection from "@/app/components/path/PathSection";
import Challengecarousel from "./components/challenges/Challengecarousel";
import Goalpig from "./components/Goalpig";
import { ThemeProvider } from "./components/settings/ThemeProvider";
import ThemeManager from "./components/settings/ThemeManager";
import { ApiHandler } from "@/utils/api";
import { Goal } from "@/util/types/Goal";
import NewGoalModal from "./components/GoalModal"; // Import the NewGoalModal component
import { progress } from "framer-motion";

export default function Home() {
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "auto") || "light"; // Get saved theme if exists
    ThemeManager.setTheme(savedTheme);
    console.log("Theme set to: ", savedTheme);
  }, []);

  const [showModal, setShowModal] = useState(false); // State for modal visibility

  function getGoal() {
    console.log(ApiHandler("/goal", "get", "/getActiveGoal"));
  }

  const goal = {
    name: "test",
    description: "testdescription",
    amount: 1,
    progress: 0,
    deadline: new Date(),
    username: "john",
    active: false,
  };

  function setGoal() {
    console.log(ApiHandler("/goal", "post", "/setGoal", goal));
  }

  // Function to open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ThemeProvider>
      <main className="bg-gradient-to-b from-[#65DEF1] via-[#ffecbe] to-[#f8e539] w-full overflow-x-hidden h-screen flex">
        <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
          <div>
            <div className="md:h-72 h-48">
              {goal.active ? (
                <Goalpig current={600} max={1000} goal={"Tur til københavn"} />
              ) : (
                <div className="justify-center h-full items-center flex">
                  {/* Call openModal function on button click */}
                  <button className="p-2 bg-green-600 text-gray-50" onClick={openModal}>
                    Start nytt sparemål
                  </button>
                </div>
              )}
            </div>
            <Challengecarousel />
            {/* <button onClick={getGoal}>test</button> */}
          </div>
          <PathSection />
        </div>
      </main>
      {/* Render modal component conditionally based on showModal state */}
      {showModal && <NewGoalModal closeModal={closeModal} />}
    </ThemeProvider>
  );
}
