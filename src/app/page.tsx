"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import Challengecarousel from "./components/challenges/Challengecarousel";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#65DEF1] to-[#65DEF1] w-full h-screen flex">
      <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
        <div>
          
          <Challengecarousel />
        </div>
        <PathSection />
      </div>
    </main>
  );
}
