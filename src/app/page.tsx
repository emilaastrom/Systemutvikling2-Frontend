"use client";
import PathSection from "@/app/components/path/PathSection";

export default function Home() {
    return (
        <main className="bg-white w-full h-screen flex">
            <div className="flex-1 flex flex-col items-center flex-grow">
                <PathSection />
            </div>
        </main>
    );
}
