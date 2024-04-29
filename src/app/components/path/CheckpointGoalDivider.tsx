import React, { useState, useEffect, useRef } from 'react';
import { colors } from "../../../../tailwind.config";
import { Vector } from "@/util/types/vector";

export default function Checkpoint({
  passed,
  coords,
  scale,
  size,
  borderWidth,
}) {
  const divRef = useRef(null); // Reference to the outer div
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // State to store the dimensions of the div

  const color = passed ? "bg-primary-light" : "bg-secondary-light";
  const hoverColor = passed ? "hover:bg-primary-dark" : "hover:bg-secondary-dark";
  const opacity = Math.max(
    0,
    Math.min(1, Math.pow(coords.y / (200 * scale), 2))
  );

  // Adjust dimensions on mount and when the div's size changes
  useEffect(() => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      });
    }
  }, [divRef.current]); // Dependency on divRef.current ensures re-calculation when the div changes

  // Adjusted style with dynamic left positioning based on the div width
  const style = {
    position: 'absolute',
    left: `${coords.x - dimensions.width / 2}px`, // Adjusts left based on the width of the div
    top: `${coords.y - dimensions.height / 2}px`,
    opacity: opacity
  };

  return (
    <div ref={divRef} className="" style={style}>
      <div className="flex ">
        <p className="flex bg-white bg-opacity-15">
          Mål: Tur til København!
        </p>
      </div>
    </div>
  );
}
