"use client";
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
import Goalpig from "./components/Goalpig"; 
import { error } from "console";
import { userInfo } from "os";
import Image from "next/image";
import TwinklingStars from "./components/TwinklingStars";
import { ActiveChallenge } from "@/util/types/Challenge";

export default function Home() {
    const [finishedChallenges, setFinishedChallenges] = useState<ActiveChallenge[]>([]);
    const [unfinishedChallenges, setUnFinishedChallenges] = useState<ActiveChallenge[]>([]);
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
            if (
                goal.data != null &&
                goal.data.active === true &&
                goal.status === 200
            ) {
                setGoal(goal.data.name);
                setCurrent(goal.data.progress);
                setMax(goal.data.amount);
                setActive(1);
            } else if (goal.data === null || goal.status === 400) {
                setActive(0);
            } else {
                setActive(-1);
                console.error(goal.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setActive(0);
            } else {
                setActive(-1);
                console.error(error);
            }
        }
    };
    const fetchActiveChallenges = async () => {
        const challenges = await apiHandler(
            "challenge",
            "get",
            "/getActiveChallenges"
        );
        const today = new Date();
        const completed:ActiveChallenge[] = [];

        for (const challenge of challenges.data) {
            const endDate = new Date(challenge.assignedChallenge.endDate);
            if (endDate < today) {
                completed.push(challenge.challenge);
            }
        }
        let anyCompleted = false;
        let finished = []
        let unfinished = []
        for (const challenge of completed) {
            anyCompleted = true;
            /* const response = await apiHandler(
                "challenge",
                "post",
                "/finishChallenge",
                { id:challenge.assignedChallenge.id }
            ); 
            if(response.data.completed){
                finished.push(response.data)
            }else{
                unfinished.push(response.data)
            }*/
        }
        setFinishedChallenges(finished)  
        setUnFinishedChallenges(unfinished)  
        setShowCompletedPopup(true);
         if (anyCompleted===true) {
             setShowCompletedPopup(true); 
        }  
    };

    useEffect(() => {
        fetchActiveChallenges()
        fetchActiveGoal();
        const savedTheme =
            (localStorage.getItem("theme") as "light" | "dark" | "auto") ||
            "light";
        ThemeManager.setTheme(savedTheme);
        console.log("Theme set to: ", savedTheme);
        if (showModal) {
            document.body.style.overflow = "hidden";
        }
    }, []);

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

    if (active !== 1 && active !== 0) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-r from-background-50 via-background-100 to-background-200 bg-opacity-25 z-50">
                <div className="animate-spin rounded-full h-64 w-64 border-2 border-t-2 border-t-grass-light border-white">
                </div>
            </div>
        );
    }

    return (
        <ThemeProvider>
            <main className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-sky-600 dark:via-sky-800 dark: dark:to-sky-900 from-sky-light via-sky-medium to-sky-dark w-full overflow-x-hidden h-screen flex">
              <TwinklingStars />
                <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
                    <div>
                        <Challengecarousel />
                        <div className="h-auto">
                            <button
                                className="bg-white text-black border-2 border-black p-2 m-2 absolute right-0 z-10"
                                onClick={openCheckpointModal}
                            >
                                TESTKNAPP FOR UTFORDRING PÅ STIEN <br />
                                <span className="text-xs">
                                    husk det lille problemet med at vi ikke kan
                                    trykke <br />
                                    checkpoints den om vi ikke bruker chrome
                                </span>
                            </button>
                            {active === 1 && (
                                <Goalpig
                                    current={current}
                                    max={max}
                                    goal={goal}
                                />
                            )}
                            {active === 0 && (
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
                    </div>
                    <PathSection />
                </div>
            </main>
            {showGoalModal && <NewGoalModal closeModal={toggleGoalModal} />}
            {showModal && (
                <ChallengecardModalCompleted
                    onClose={toggleModal}
                    challengeText={
                        "veldig kult eksempel på en utfordring yippi!"
                    }
                    challengeStartDate={new Date()}
                    challengeEndDate={
                        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                    }
                />
            )}
            {finishedChallenges.length > 0 && showCompletedPopup && (
                <ChallengesFinishedPopup
                    closePopup={toggleCompletedPopup}
                    finished={finishedChallenges}
                    unfinished={unfinishedChallenges}
                />
            )}
        </ThemeProvider>
    );
}
