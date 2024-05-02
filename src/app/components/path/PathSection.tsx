import React, { useEffect, useRef, useState } from "react";
import { Vector } from "@/util/types/vector";
import PathProvider from "@/app/hooks/PathProvider";
import ProceduralPath from "@/app/components/path/ProceduralPath";
import PathElements from "@/app/components/path/PathElements";

export default function PathSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastYRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number>(0);

  const [dimensions, setDimensions] = useState<Vector>({ x: 1, y: 1 });
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;

    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      let newDimensions = {
        x: entries[0].contentRect.width,
        y: entries[0].contentRect.height,
      };
      if (newDimensions.x <= 0) newDimensions.x = 1;
      if (newDimensions.y <= 0) newDimensions.y = 1;
      setDimensions(newDimensions);
    });

    // Handle wheel scroll
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const currentTime = event.timeStamp;
      const deltaY = event.deltaY;

      velocityRef.current = (deltaY / (currentTime - lastTimeRef.current));
      positionRef.current += deltaY;

      lastTimeRef.current = currentTime;
      setPosition(positionRef.current);
    };

    // Handle touch scroll
    const handleTouchStart = (event: TouchEvent) => {
      lastYRef.current = event.touches[0].clientY;
      lastTimeRef.current = event.timeStamp;
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (event.cancelable) event.preventDefault();
      const currentY = event.touches[0].clientY;
      const currentTime = event.timeStamp;

      const deltaY = lastYRef.current - currentY;
      velocityRef.current = (deltaY / (currentTime - lastTimeRef.current)) * 3;
      positionRef.current += deltaY;

      lastYRef.current = currentY;
      lastTimeRef.current = currentTime;
      setPosition(positionRef.current);
    };
    const handleTouchEnd = () => {
      const friction = 0.97;
      const threshold = 0.01;

      const applyMomentum = () => {
        positionRef.current += velocityRef.current;
        velocityRef.current *= friction;

        if (Math.abs(velocityRef.current) > threshold) {
          setPosition(positionRef.current);
          animationFrameIdRef.current = requestAnimationFrame(applyMomentum);
        }
      };

      animationFrameIdRef.current = requestAnimationFrame(applyMomentum);
    };

    if (section) {
      // Add resize observer
      resizeObserver.observe(section);

      // Add wheel event listener
      section.addEventListener("wheel", handleWheel);

      // Add touch event listeners
      section.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      section.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      section.addEventListener("touchend", handleTouchEnd, {
        passive: false
      });
    }

    return () => {
      if (section) {
        // Remove resize observer
        resizeObserver.unobserve(section);

        // Remove wheel event listener
        section.removeEventListener("wheel", handleWheel);

        // Remove touch event listeners
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchmove", handleTouchMove);
        section.removeEventListener("touchend", handleTouchEnd);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [sectionRef]);

  return (
    <section
        className="h-[600px] bg-gradient-to-b from-grass-light to-grass-dark overflow-hidden relative parent"
        style={{ width:"200%", borderTopLeftRadius: "50%", borderTopRightRadius: "50%", boxSizing: "border-box", maxHeight: "600px" }}
    >
      <div ref={sectionRef} className="w-full h-full" style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 0",
      }}
      >
        <div style={{
          transform: "rotateX(70deg) translateY(-0px) scale(3)",
          transformOrigin: "center bottom",
        }}>
          <PathProvider
              dimensions={dimensions}
              position={position}
              seed={"seed"}
              amplitude={150}
              period={1 / 400}
          >
            <PathElements/>
            <ProceduralPath
                dimensions={dimensions}
                stepLength={5}
                width={50}
            />
          </PathProvider>
        </div>
      </div>
    </section>
  );
}
