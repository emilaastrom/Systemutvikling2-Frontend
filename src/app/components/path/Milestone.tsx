import React, { useState, useEffect, useRef } from 'react';
import { colors } from "../../../../tailwind.config";
import { Vector } from "@/util/types/vector";

export default function Milestone({
  goalName,
  coords,
  scale,
}) {
  const divRef = useRef(null); // Reference to the outer div
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // State to store the dimensions of the div

  const opacity = Math.max(0, Math.min(1, Math.pow(coords.y / (200 * scale), 2)));

  // Adjust dimensions on mount and when the div's size changes
  useEffect(() => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      });
    }
  }, [divRef, scale]); // Dependency on divRef.current ensures re-calculation when the div changes

  return (
    <div
      ref={divRef}
      className="absolute bg-white bg-opacity-15"
      style={{
        left: `${coords.x - dimensions.width / 2}px`,
        top: `${coords.y - dimensions.height / 2}px`,
        fontSize: `${32 * scale}px`,
        opacity: opacity,
      }}
    >
      {goalName}
    </div>
  );
}
