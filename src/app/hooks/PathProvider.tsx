import React, { ReactNode, useCallback, useRef, useState, useEffect } from "react";
import alea from "alea";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import { Vector } from "@/util/types/vector";

interface PathProviderProps {
    children: ReactNode;
    dimensions: Vector;
    position: number;
    seed: string;
    amplitude: number;
    period: number;
}

interface PathContextType {
    scale: number;
    bounds: Vector;
    worldToScreen: (worldPos: Vector) => Vector;
    pathFunction: (x: number) => number;
}

export const PathContext = React.createContext<PathContextType>({
    scale: 1,
    bounds: { x: 0, y: 0 },
    worldToScreen: () => {
        console.warn("worldToScreen was called without being initialized");
        return { x: 0, y: 0 };
    },
    pathFunction: () => {
      console.warn("pathFunction was called without being initialized");
      return 0;
    },
});

const PathProvider: React.FC<PathProviderProps> = (
    {
        children,
        dimensions,
        position,
        seed,
        amplitude,
        period,
    }) => {

    // Calculate scale
    const [scale, setScale] = useState<number>(1);
    useEffect(() => {
      setScale(dimensions.y / 800);
    }, [dimensions]);

    // Calculate bounds
    const [bounds, setBounds] = useState<Vector>({ x: 0, y: 0 });
    useEffect(() => {
        const halfHeight = dimensions.y / (scale * 2);
        setBounds({ x: -position - halfHeight, y: -position + halfHeight});
    }, [dimensions, position, scale]);

    // Calculate world to screen
    const worldToScreen = useCallback((worldPosition: Vector) => {
        const screenPos = { x: 0, y: 0 }
        screenPos.x = dimensions.x / 2 + worldPosition.x * scale;
        screenPos.y = dimensions.y / 2 - worldPosition.y * scale - position * scale;
        return screenPos;
    }, [dimensions, position, scale]);

    // Create noise function
    const prng = alea(seed);
    const noise = createNoise2D(prng);

    // Define wave function
    const waveFunction = (
      func: NoiseFunction2D,
      t: number,
      amplitude: number,
      period: number,
      phaseShift: number,
      verticalShift: number,
    ) => amplitude * func(period * (t + phaseShift), 0) + verticalShift;

    // Define path function
    const pathFunction = useCallback((t: number) => {
      return waveFunction(noise, t, amplitude, period, 0, 0);
    }, [noise, amplitude, period]);

    return (
        <PathContext.Provider value={{ scale, bounds, worldToScreen, pathFunction }}>
            {children}
        </PathContext.Provider>
    );
};

export default PathProvider;