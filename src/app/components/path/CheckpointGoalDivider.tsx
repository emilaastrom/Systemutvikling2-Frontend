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


  interface StyleProps {
    coords: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    opacity: number;
  }
  
   // Calculate positions dynamically
   const leftPosition = coords.x - dimensions.width / 2;
   const topPosition = coords.y - dimensions.height / 2;
   const opacityStyle = { opacity };
 
   return (
     <div
       ref={divRef}
       className="absolute" // Positioning from Tailwind
       style={{
         left: `${leftPosition}px`,
         top: `${topPosition}px`,
         ...opacityStyle
       }}
     >
       <div className="flex">
         <p className="flex bg-white bg-opacity-15">
           Mål: Tur til København!
         </p>
       </div>
     </div>
   );
}
