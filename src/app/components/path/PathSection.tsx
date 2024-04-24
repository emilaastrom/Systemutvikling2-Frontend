import React, { useState, useEffect, useRef } from "react";
import { Vector } from "@/util/types/vector";
import PathProvider from "@/app/hooks/PathProvider";
import ProceduralPath from "@/app/components/path/ProceduralPath";
import CheckpointContainer from "@/app/components/path/CheckpointContainer";

export default function PathSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef(0);
  const velocityRef = useRef(0);

  const [dimensions, setDimensions] = useState<Vector>({ x: 1, y: 1 });
  const [position, setPosition] = useState(0)

  const [lastY, setLastY] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      setDimensions({
        x: entries[0].contentRect.width,
        y: entries[0].contentRect.height,
        // x: 1000,
        // y: 2000,
      });
    });

    if (section) {
      resizeObserver.observe(section);
    }

    return () => {
      if (section) {
        resizeObserver.unobserve(section);
      }
    };
  }, [sectionRef]);

  useEffect(() => {
    const section = sectionRef.current;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const currentTime = event.timeStamp;
      const deltaY = event.deltaY;

      velocityRef.current = (deltaY / (currentTime - lastTime)) * 12;
      positionRef.current += deltaY;

      setPosition(positionRef.current);
      setLastTime(currentTime);
    };

    if (section) {
      section.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (section) {
        section.removeEventListener("wheel", handleWheel);
      }
    };
  }, [sectionRef, lastTime]);

  useEffect(() => {
    const section = sectionRef.current;

    const handleTouchStart = (event: TouchEvent) => {
      setLastY(event.touches[0].clientY);
      setLastTime(event.timeStamp);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.cancelable) event.preventDefault();
      const currentY = event.touches[0].clientY;
      const currentTime = event.timeStamp;

      const deltaY = lastY - currentY;
      velocityRef.current = (deltaY / (currentTime - lastTime)) * 12;
      positionRef.current += deltaY;

      setPosition(positionRef.current);
      setLastY(currentY);
      setLastTime(currentTime);
    };

    const handleTouchEnd = () => {
      const friction = 0.95;
      const threshold = 0.01;

      const applyMomentum = () => {
        positionRef.current += velocityRef.current;

        velocityRef.current *= friction;

        if (Math.abs(velocityRef.current) > threshold) {
          setPosition(positionRef.current);
          setAnimationFrameId(requestAnimationFrame(applyMomentum));
        }
      };

      setAnimationFrameId(requestAnimationFrame(applyMomentum));
    };

    if (section) {
      section.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      section.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      section.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchmove", handleTouchMove);
        section.removeEventListener("touchend", handleTouchEnd);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [sectionRef, velocityRef, lastY, lastTime, animationFrameId]);

  return (
    <section className="relative w-full h-full overflow-hidden">
      <div ref={sectionRef} className="w-full h-full" style={{
        perspective: "1000px",
        // perspectiveOrigin: "50% 0",
        transformStyle: "preserve-3d",
      }}
      >
        <div style={{
          backgroundColor: "#8CD867",
          // transform: "rotateX(60deg) translateY(-0px) scale(2)",
          // transformOrigin: "center bottom",
        }}>
          <PathProvider
              seed={"seed"}
              dimensions={dimensions}
              position={position}
              amplitude={150}
              period={1 / 400}
          >
            <CheckpointContainer/>
            <ProceduralPath
                dimensions={dimensions}
                color={"#9a9a9a"}
                stepLength={5}
                width={50}
            />
          </PathProvider>
        </div>
      </div>
    </section>
  );
}
