"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import Challengecarousel from "./components/Challengecarousel";

export default function Home() {
  const [progress, setProgress] = useState(230);

  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <main className="bg-white w-screen h-screen">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          gravity={0.4}
          initialVelocityY={40}
          height={window.innerHeight}
        />
      )}

      <div className="flex-1 flex flex-col items-center pt-12">
        <Challengecarousel />

        <div className="w-2/5 mt-12 p-5">
          <ProgressBar
            goal={1000}
            progress={progress}
            goalName={"Trip to norway"}
            milestones={[100, 500, 800]}
            setShowConfetti={setShowConfetti}
          />
        </div>
        <button
          className="bg-black p-4 mt-10 rounded-xl hover:bg-red-300 "
          onClick={() => setProgress(progress + 100)}
        >
          Add 100
        </button>
      </div>
    </main>
  );
}
