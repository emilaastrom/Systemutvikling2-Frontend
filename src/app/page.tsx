"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import Challengecarousel from "./components/Challengecarousel";

export default function Home() {
  return (
    <main className="bg-white w-full h-screen flex">
      <div className="flex-1 flex flex-col items-center mt-12 flex-grow ">
        <div>
          <Challengecarousel />
        </div>
        <PathSection />
      </div>
    </main>
  );
}
