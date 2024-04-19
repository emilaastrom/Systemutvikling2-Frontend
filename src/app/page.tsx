"use client";
import PathSection from "@/app/components/path/PathSection";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProgressBar from "./components/Progressbar";
import Confetti from "react-confetti";

export default function Home() {
    return (
        <main className="w-screen h-screen">
            <PathSection />
        </main>
    );
}
