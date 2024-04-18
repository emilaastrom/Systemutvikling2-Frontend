"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";
import PathSection from "@/app/components/path/PathSection";

export default function Home() {
    const [progress, setProgress] = useState(230);

    const [showConfetti, setShowConfetti] = useState(false);

    return (
        <main className="bg-white w-full h-screen flex overflow-hidden">
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    gravity={0.4}
                    initialVelocityY={40}
                    height={window.innerHeight}
                />
            )}

            <Navbar />
            <div className="flex-1 flex flex-col items-center flex-grow">
                <PathSection />
            </div>
        </main>
    );
}
