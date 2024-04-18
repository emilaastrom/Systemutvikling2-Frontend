"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";

export default function Home() {
  const [progress, setProgress] = useState(230);

  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <main className="bg-white w-full md:pl-20 sm:pl-2 h-auto flex overflowY-scroll">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          gravity={0.4}
          initialVelocityY={40}
          height={window.innerHeight}
        />
      )}

      <div className="flex-1 flex flex-col items-center pt-48">
        <div className="w-4/5 mt-12 p-5">
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
