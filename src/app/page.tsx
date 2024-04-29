"use client";
import PathSection from "@/app/components/path/PathSection";
import { useEffect } from "react";
import Challengecarousel from "./components/challenges/Challengecarousel";
import Goalpig from "./components/Goalpig";
import { ThemeProvider } from "./components/settings/ThemeProvider";
import ThemeManager from "./components/settings/ThemeManager";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "auto") || "light"; // Get saved theme if exists
    ThemeManager.setTheme(savedTheme);
    console.log("Theme set to: ", savedTheme);
  }, []);

  const { token } = useAuth();
  console.log("Token: ", token);
  return (
    <ThemeProvider>
      <main className="bg-gradient-to-b from-[#65DEF1] via-[#ffecbe] to-[#f8e539] w-full overflow-x-hidden h-screen flex">
        <div className="flex-1 flex flex-col items-center flex-grow mt-10 ">
          <div>
            <Goalpig current={600} max={1000} goal={"Tur til københavn"} />
            <Challengecarousel />
          </div>
          <PathSection />
        </div>
      </main>
    </ThemeProvider>
  );
}
