import React, {useContext, useEffect, useRef, useState} from "react";
import { Vector } from "@/util/types/vector";
import { ActiveChallenge } from "@/util/types/Challenge";
import PathProvider from "@/app/hooks/PathProvider";
import ProceduralPath from "@/app/components/path/ProceduralPath";
import PathElements from "@/app/components/path/PathElements";
import { PathApiContext } from "@/app/hooks/PathApiProvider";

type PathSectionProps = {
  openCheckpointModal: (activeChallenge: ActiveChallenge | null) => void;
};

export default function PathSection({ openCheckpointModal }: PathSectionProps) {
    const { pathLength } = useContext(PathApiContext);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const positionRef = useRef(0);
    const velocityRef = useRef(0);

    const [dimensions, setDimensions] = useState<Vector>({ x: 1, y: 1 });
    const [position, setPosition] = useState(0);

    const [lastY, setLastY] = useState(0);
    const [lastTime, setLastTime] = useState(0);
    const [animationFrameId, setAnimationFrameId] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

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

            positionRef.current = Math.max(Math.min(positionRef.current, -dimensions.y / 2), -pathLength);

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
    }, [sectionRef, lastTime, dimensions, pathLength]);

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

            positionRef.current = Math.max(Math.min(positionRef.current, -dimensions.y / 2), -pathLength);

            setPosition(positionRef.current);
            setLastY(currentY);
            setLastTime(currentTime);
        };

        const handleTouchEnd = () => {
            const friction = 0.95;
            const threshold = 0.01;

            const applyMomentum = () => {
                positionRef.current += velocityRef.current;
                positionRef.current = Math.max(Math.min(positionRef.current, -dimensions.y / 2), -pathLength);
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
            section.addEventListener("touchend", handleTouchEnd, {
                passive: false,
            });
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
    }, [sectionRef, velocityRef, lastY, lastTime, animationFrameId, dimensions, pathLength]);

    return (
        <section
            className="h-[600px] bg-gradient-to-b from-[#0d8c50] to-[#076639] dark:from-grass-light dark:to-grass-dark overflow-hidden relative parent z-20"
            style={{
                width: "200%",
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%",
                boxSizing: "border-box",
                maxHeight: "600px",
            }}
        >
            <div
                ref={sectionRef}
                className="w-full h-full"
                style={{
                    perspective: "1000px",
                    perspectiveOrigin: "50% 0",
                }}
            >
                <div
                    style={{
                        transform: "rotateX(70deg) translateY(-0px) scale(3)",
                        transformOrigin: "center bottom",
                    }}
                >
                    <PathProvider
                        seed={"seed"}
                        dimensions={dimensions}
                        position={position}
                        amplitude={150}
                        period={1 / 400}
                    >
                        <PathElements openCheckpointModal={openCheckpointModal} />
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
