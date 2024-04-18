import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Dimensions } from "@/util/types/dimensions";
import { NoiseContext } from "@/app/hooks/NoiseProvider";

export default function ProceduralPath(
    {
        dimensions,
        color,
        stepLength,
        maxOffset,
    }: {
        dimensions: Dimensions;
        color: string;
        stepLength: number;
        maxOffset: number;
    }) {

    const { pathFunction } = useContext(NoiseContext);
    const [pathData, setPathData] = useState("");

    const generatePathData = useCallback(() => {
        const y0 = dimensions.height + maxOffset / 2;
        let pathData = `M ${pathFunction(y0)},${y0} `;
        for (let y = y0 - stepLength; y >= -maxOffset / 2; y -= stepLength) {
            pathData += `L ${pathFunction(y)},${y} `;
        }
        return pathData;
    }, [dimensions, pathFunction, maxOffset, stepLength]);

    useEffect(() => {
        setPathData(generatePathData());
    }, [generatePathData]);

    return (
        <motion.svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
            <motion.path
                d={pathData}
                fill={"none"}
                stroke={color}
                strokeWidth={50}
            />
        </motion.svg>
    );
}