import React, { useState, useEffect, useRef } from "react";
import NoiseProvider from "@/app/hooks/NoiseProvider";
import ProceduralPath from "@/app/components/path/ProceduralPath";
import { Dimensions } from "@/util/types/dimensions";

export default function PathSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

        const resizeObserver = new ResizeObserver(entries => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }
            setDimensions({
                width: entries[0].contentRect.width,
                height: entries[0].contentRect.height,
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
            let newPosition = position + event.deltaY;
            setPosition(newPosition);
        };

        if (section) {
            section.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (section) {
                section.removeEventListener('wheel', handleWheel);
            }
        };
    }, [sectionRef, position]);

    return (
        <section className="w-full h-full" ref={sectionRef} style={{ backgroundColor: "#9cc458" }}>
            <NoiseProvider
                seed={"seed"}
                dimensions={dimensions}
                position={position}
                amplitude={150}
                period={1/400}
            >
                <ProceduralPath
                    dimensions={dimensions}
                    color={"#C3995C"}
                    stepLength={5}
                    maxOffset={40}
                />
            </NoiseProvider>
        </section>
    );
}