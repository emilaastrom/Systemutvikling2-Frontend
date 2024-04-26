"use client";
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
import ChallengecardModal from "./components/challenges/ChallengecardModal";
import ChallengecardAddModal from "./components/challenges/ChallengecardAddModal";
import ChallengecardModalCompleted from "./components/challenges/ChallengecardModalCompleted";

export default function Home() {
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "auto") || "light"; // Get saved theme if exists
    ThemeManager.setTheme(savedTheme);
    console.log("Theme set to: ", savedTheme);
    if (showModal) {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showGoalModal, setShowGoalModal] = useState(false); // State for goal modal visibility

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleGoalModal = () => {
    setShowGoalModal(!showGoalModal);
  };

  // Pass toggleModal function to child components via context
  const modalContext = React.createContext({ toggleModal });

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
    active: true,
  };

  function openCheckpointModal(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    toggleModal();
  }

  return (
    <ThemeProvider>
      <modalContext.Provider value={{ toggleModal }}>
        <main className="bg-gradient-to-b from-[#65DEF1] via-[#ffecbe] to-[#f8e539] w-full overflow-x-hidden h-screen flex">
          <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
            <div>
              <div className="md:h-72 h-48">
                <button
                  className="bg-white text-black border-2 border-black p-2 m-2 absolute z-10"
                  onClick={openCheckpointModal}
                >
                  TESTKNAPP FOR UTFORDRING PÅ STIEN <br />
                  <span className="text-xs">
                    husk det lille problemet med at vi ikke kan trykke
                    checkpoints den om vi ikke bruker chrome
                  </span>
                </button>
                {goal.active ? (
                  <Goalpig
                    current={600}
                    max={1000}
                    goal={"Tur til københavn"}
                  />
                ) : (
                  <div className="justify-center h-full items-center flex">
                    {/* Call openModal function on button click */}
                    <button
                      className="p-2 bg-green-600 text-gray-50"
                      onClick={toggleGoalModal}
                    >
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
        {showGoalModal && <NewGoalModal closeModal={toggleGoalModal} />}
        {showModal && (
          <ChallengecardModalCompleted
            onClose={toggleModal}
            challengeText={"veldig kult eksempel på en utfordring yippi!"}
            challengeStartDate={new Date()}
            challengeEndDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
          />
        )}
      </modalContext.Provider>
    </ThemeProvider>
  );
}
