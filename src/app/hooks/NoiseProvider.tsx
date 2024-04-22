import React, {useCallback, ReactNode, useRef, MutableRefObject, useState, useEffect} from "react";
import alea from "alea";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import { Vector } from "@/util/types/vector";

interface NoiseProviderProps {
    children: ReactNode;
    seed: string;
    dimensions: Vector;
    position: number;
    amplitude: number;
    period: number;
}

interface NoiseContextType {
    noise: React.MutableRefObject<NoiseFunction2D>;
    createNoise: (seed: string) => void;
    pathFunction: (x: number) => number;
}

export const NoiseContext = React.createContext<NoiseContextType>({
    noise: {
        current: () => 0
    },
    createNoise: () => {
        console.warn('createNoise was called without being initialized');
    },
    pathFunction: () => {
        console.warn('pathFunction was called without being initialized');
        return 0;
    }
});

const NoiseProvider: React.FC<NoiseProviderProps> = (
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

    const createNoise = useCallback((seed: string) => {
        const prng = alea(seed);
        noise.current = createNoise2D(prng);
    }, []);

    const waveFunction = (
        func: NoiseFunction2D,
        x: number,
        amplitude: number,
        period: number,
        phaseShift: number,
        verticalShift: number,
    ) => amplitude * func(period * (x + phaseShift), 0) + verticalShift;

    const pathFunction = useCallback((x: number) => {
        return waveFunction(noise.current, x, amplitude, period, position, dimensions.x / 2);
    }, [noise, amplitude, period, position, dimensions.x]);

    return (
        <NoiseContext.Provider value={{ noise, createNoise, pathFunction }}>
            {children}
        </NoiseContext.Provider>
    );
};

export default NoiseProvider;