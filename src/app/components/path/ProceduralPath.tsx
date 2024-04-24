import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Vector } from "@/util/types/vector";
import { PathContext } from "@/app/hooks/PathProvider";

export default function ProceduralPath(
    {
        dimensions,
        color,
        stepLength,
        width,
    }: {
        dimensions: Vector;
        color: string;
        stepLength: number;
        width: number;
    }) {

    const { scale, bounds, pathFunction, worldToScreen } = useContext(PathContext);
    const [pathData, setPathData] = useState("");

    const generatePathData = useCallback(() => {
        const t0 = bounds.x;
        const p0 = worldToScreen({x: pathFunction(t0), y: t0});
        let pathData = `M ${p0.x},${p0.y} `;
        for (let t = t0 - (width / 2); t < bounds.y + (width / 2); t += stepLength) {
            const p = worldToScreen({x: pathFunction(t), y: t});
            pathData += `L ${p.x},${p.y} `;
        }
        return pathData;
    }, [bounds, pathFunction, worldToScreen, stepLength, width]);

    useEffect(() => {
        setPathData(generatePathData());
    }, [generatePathData]);

    return (
        <motion.svg viewBox={`0 0 ${dimensions.x} ${dimensions.y}`}>
            <motion.path
                d={pathData}
                fill={"none"}
                stroke={color}
                strokeWidth={width * scale}
                strokeLinecap={"round"}
            />
        </motion.svg>
    );
}