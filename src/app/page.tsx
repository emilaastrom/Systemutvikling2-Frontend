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

      <div className="flex-1 flex flex-col items-center pt-12 h-screen">
        <div className="">
          <Challengecarousel />
        </div>
        <PathSection />
      </div>
    </main>
  );
}
