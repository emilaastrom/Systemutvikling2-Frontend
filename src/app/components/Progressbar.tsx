import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({
  progress,
  goal,
  goalName,
  milestones,
  setShowConfetti,
}: {
  progress: number;
  goal: number;
  goalName: string;
  milestones: number[];
  setShowConfetti: any;
}) => {
  const path = "M 10,50 Q 150,10 300,50 Q 450,90 600,50";

  useEffect(() => {
    milestones.forEach((milestone) => {
      if (progress >= milestone && progress - 100 < milestone) {
        // Check if recently achieved
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000); // Stop confetti after 2 seconds
      }
    });
  }, [progress, milestones]);

  // Function to find y-coordinate along a quadratic Bezier curve
  function findYatX(x: number, P0: any, P1: any, P2: any) {
    const t = (x - P0.x) / (P2.x - P0.x);
    const y = (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y;
    return y;
  }

  const totalPathLength = 590;

  const milestonePositions = milestones.map((milestone) => {
    const x = 10 + (milestone / goal) * totalPathLength;
    let y;
    if (x <= 300) {
      y = findYatX(x, { x: 10, y: 50 }, { x: 150, y: 10 }, { x: 300, y: 50 });
    } else {
      y = findYatX(x, { x: 300, y: 50 }, { x: 450, y: 90 }, { x: 600, y: 50 });
    }
    return { x, y };
  });

  return (
    <div className="relative w-full p-5">
      <h3 className="absolute text-black font-mono top-0 left-0 text-lg">
        {goalName}
      </h3>
      <motion.svg className="w-full" viewBox="0 0 600 100">
        <path d={path} fill="none" stroke="#ddd" strokeWidth="8" />
        <motion.path
          d={path}
          fill="none"
          stroke="#06DD36"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={totalPathLength}
          initial={{ strokeDashoffset: totalPathLength }}
          animate={{
            strokeDashoffset:
              totalPathLength - (progress / goal) * totalPathLength,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
        {milestonePositions.map((pos, index) => (
          <circle
            key={index}
            cx={pos.x}
            cy={pos.y}
            r="10"
            fill="white"
            stroke={
              (progress / goal) * totalPathLength >= pos.x ? "#06DD36" : "black"
            }
            strokeWidth="2"
          />
        ))}
      </motion.svg>
      <h3 className="absolute bottom-0 text-black right-0 text-md font-mono">
        {`${progress}/${goal} NOK`}
      </h3>
    </div>
  );
};

export default ProgressBar;
