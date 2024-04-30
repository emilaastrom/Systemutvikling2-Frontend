'use client'
import React, { useState, useEffect, useCallback } from "react";
import PathSection from "@/app/components/path/PathSection";
import Challengecarousel from "./components/challenges/Challengecarousel";
import { ThemeProvider } from "./components/settings/ThemeProvider";
import ThemeManager from "./components/settings/ThemeManager";
import NewGoalModal from "./components/GoalModal";
import { progress } from "framer-motion";
import ChallengecardModal from "./components/challenges/ChallengecardModal";
import ChallengecardAddModal from "./components/challenges/ChallengecardAddModal";
import ChallengecardModalCompleted from "./components/challenges/ChallengecardModalCompleted";
import ChallengesFinishedPopup from "./components/ChallengesFinishedPopup";
import { useApiHandler } from "../utils/api";
import Goalpig from "./components/Goalpig"; // Move the import here

export default function Home() {
  const [succeededChallenges, setSucceededChallenges] = useState([]);
  const [notSucceededChallenges, setNotSucceededChallenges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCompletedPopup, setShowCompletedPopup] = useState(false);
  const [goal, setGoal] = useState<string>("");
  const [current, setCurrent] = useState<number>();
  const [max, setMax] = useState<number>();
  const [active, setActive] = useState<number>(-1);

  const apiHandler = useApiHandler();
  const fetchActiveGoal = async () => {
    console.log("Fetching active goal data");
    try {
      const goal = await apiHandler("goal", "get", "/getActiveGoal");
      if (goal.data != null && goal.data.active===true && goal.status===200){
      setGoal(goal.data.name);
      setCurrent(goal.data.progress);
      setMax(goal.data.amount);
      setActive(1);
    }
      else if(goal.data===null || goal.status===400){
        setActive(0)
      }
      else{
        setActive(-1)
        console.error(goal.data);
      }
    } catch (error) {
      if(error.response && error.response.status===400){
        setActive(0)
      } else{
      setActive(-1)
      console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchActiveGoal();
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "auto") || "light";
    ThemeManager.setTheme(savedTheme);
    console.log("Theme set to: ", savedTheme);
    if (showModal) {
      document.body.style.overflow = "hidden";
    }
  }, [fetchActiveGoal()]);


  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleCompletedPopup = () => {
    setShowCompletedPopup(!showCompletedPopup);
  };
  const toggleGoalModal = () => {
    setShowGoalModal(!showGoalModal);
  };

  function openCheckpointModal(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    toggleModal();
  }

  return (
    <ThemeProvider>
      <main className="bg-gradient-to-b from-sky-dark to-sky-light w-full overflow-x-hidden h-screen flex">
        <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
          <div>
            <div className="md:h-72 h-48">
              <button
                className="bg-white text-black border-2 border-black p-2 m-2 absolute z-10"
                onClick={openCheckpointModal}
              >
                TESTKNAPP FOR UTFORDRING PÅ STIEN <br />
                <span className="text-xs">
                  husk det lille problemet med at vi ikke kan trykke <br />
                  checkpoints den om vi ikke bruker chrome
                </span>
              </button>
              {/* Render Goalpig only if 'active' is true and 'goal' is set */}
              {active===1 && (
                <Goalpig current={current} max={max} goal={goal} />
              )}
              {active===0 && (
                <div className="justify-center h-full items-center flex">
                  <button
                    className="p-4 bg-primary-dark hover:bg-primary-light text-white drop-shadow-md rounded-md mr-2"
                    onClick={toggleGoalModal}
                  >
                    Lag et nytt sparemål
                  </button>
                </div>
              )}
            </div>
            <Challengecarousel />
          </div>
          <PathSection />
        </div>
      </main>
      {showGoalModal && <NewGoalModal closeModal={toggleGoalModal} />}
      {showModal && (
        <ChallengecardModalCompleted
          onClose={toggleModal}
          challengeText={"veldig kult eksempel på en utfordring yippi!"}
          challengeStartDate={new Date()}
          challengeEndDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
        />
      )}
      {showCompletedPopup && (
        <ChallengesFinishedPopup
          closePopup={toggleCompletedPopup}
          succeeded={succeededChallenges}
          failed={notSucceededChallenges}
        />
      )}
    </ThemeProvider>
  );
}
