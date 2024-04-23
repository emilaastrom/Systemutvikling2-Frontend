"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import Challengecarousel from "./components/challenges/Challengecarousel";
import Goalpig from "./components/Goalpig";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#65DEF1] via-[#ffecbe] to-[#f8e539] w-full overflow-x-hidden h-screen flex">
      <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
        <div>
          
          <Goalpig current={600} max={1000} goal={"Tur til københavn"} />
          <Challengecarousel />
        </div>
        <PathSection />
      </div>
    </main>
  );
}
