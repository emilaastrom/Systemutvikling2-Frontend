"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { use, useEffect, useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import Challengecarousel from "./components/Challengecarousel";
import { GetActiveGoal } from "@/utils/api";
export default function Home() {
  const [activeGoal, setActiveGoal] = useState<Goal[] | null>(null);
  type Goal = {
    title: string;
    description: string;
    // Add other properties of the goal here
  };

  const tet = async () => {
    const req = await fetch("http://localhost:8080/goal/getActiveGoal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZGVmNTU1My02Mzg4LTQ1OTYtODViMS00Njg3MDdlZWYyYzUiLCJpYXQiOjE3MTM5NDk3NzgsImV4cCI6MTcxMzk4NTc3OH0.nrN5N9iTyfqnw8EbV1by4uPFoJjyH__7axBhmWXNnDA",
      },
    });
    const res = await req.json();
    console.log(res);
  };

  tet();
  /*
  const getActiveGoal = async () => {
    const goal = await GetActiveGoal();
    console.log(goal);
    setActiveGoal(goal);
  };
  getActiveGoal();

  useEffect(() => {
    getActiveGoal();
  }, [activeGoal]);

  if (!activeGoal) {
    return <div>Loading...</div>;
  }*/
  return (
    <main className="bg-white w-full h-screen flex">
      <div className="flex-1 flex flex-col items-center flex-grow mt-10 md:pl-48">
        <div>
          <Challengecarousel />
          <button>TEST</button>
          <div>
            {/*activeGoal.map((goal, i) => (
              <div key={i}>
                <h1>{goal.title}</h1>
                <p>{goal.description}</p>
              </div>
            ))*/}
          </div>
        </div>
        <PathSection />
      </div>
    </main>
  );
}
