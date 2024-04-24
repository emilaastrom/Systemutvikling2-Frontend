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
      {/*<div className="flex ">*/}
        {/*<div>*/}
        {/*  <Challengecarousel />*/}
        {/*</div>*/}
        <PathSection />
      {/*</div>*/}
    </main>
  );
}
