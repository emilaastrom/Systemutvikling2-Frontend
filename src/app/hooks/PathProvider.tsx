import React, { useCallback, ReactNode, useRef, useState, useEffect } from "react";
import alea from "alea";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import { Vector } from "@/util/types/vector";

interface PathProviderProps {
    children: ReactNode;
    seed: string;
    dimensions: Vector;
    position: number;
    amplitude: number;
    period: number;
}

interface PathContextType {
    bounds: Vector;
    worldToScreen: (worldPos: Vector) => Vector;
    pathFunction: (x: number) => number;
}

export const PathContext = React.createContext<PathContextType>({
    bounds: { x: 0, y: 0 },
    worldToScreen: () => {
        console.warn('worldToScreen was called without being initialized');
        return { x: 0, y: 0 };
    },
    pathFunction: () => {
        console.warn('pathFunction was called without being initialized');
        return 0;
    },
});

const PathProvider: React.FC<PathProviderProps> = (
    {
        children,
        seed,
        dimensions,
        position,
        amplitude,
        period,
    }) => {

    const prng = alea(seed);
    let noise = useRef(createNoise2D(prng));

    const createNoise = (seed: string) => {
        const prng = alea(seed);
        noise.current = createNoise2D(prng);
    };

    const [bounds, setBounds] = useState<Vector>({ x: 0, y: 0 });
    useEffect(() => {
        const halfHeight = dimensions.y / 2;
        setBounds({ x: -position - halfHeight, y: -position + halfHeight });
    }, [dimensions, position]);

    const worldToScreen = useCallback((worldPosition: Vector) => {
        const screenPos = { x: 0, y: 0 }
        screenPos.x = dimensions.x / 2 + worldPosition.x;
        screenPos.y = dimensions.y / 2 - worldPosition.y - position;
        return screenPos;
    }, [dimensions, position]);

    const waveFunction = (
        func: NoiseFunction2D,
        t: number,
        amplitude: number,
        period: number,
        phaseShift: number,
        verticalShift: number,
    ) => amplitude * func(period * (t + phaseShift), 0) + verticalShift;

    const pathFunction = useCallback((t: number) => {
        return waveFunction(noise.current, t, amplitude, period, 0, 0);
    }, [amplitude, period]);

    return (
        <PathContext.Provider value={{ bounds, worldToScreen, pathFunction, }}>
            {children}
        </PathContext.Provider>
    );
};

export default PathProvider;