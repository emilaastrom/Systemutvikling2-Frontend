import React, { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { colors } from "../../../../tailwind.config";
import { Vector } from "@/util/types/vector";
import { PathContext } from "@/app/hooks/PathProvider";

export default function ProceduralPath(
    {
        dimensions,
        stepLength,
        width,
    }: {
        dimensions: Vector;
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
            <defs>
                <linearGradient id="gradient-light" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{stopColor: colors.path.light, stopOpacity: 1}}/>
                    <stop offset="70%" style={{stopColor: colors.path.light, stopOpacity: 0.5}}/>
                    <stop offset="95%" style={{stopColor: colors.path.light, stopOpacity: 0}}/>
                </linearGradient>
                <linearGradient id="gradient-dark" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{stopColor: colors.path.dark, stopOpacity: 1}}/>
                    <stop offset="70%" style={{stopColor: colors.path.dark, stopOpacity: 0.5}}/>
                    <stop offset="95%" style={{stopColor: colors.path.dark, stopOpacity: 0}}/>
                </linearGradient>
            </defs>
            <motion.path
                d={pathData}
                fill={"none"}
                stroke={"url(#gradient-light)"}
                strokeWidth={width * scale * 1.5}
                strokeLinecap={"round"}
            />
            <motion.path
                d={pathData}
                fill={"none"}
                stroke={"url(#gradient-dark)"}
                strokeWidth={width * scale}
                strokeLinecap={"round"}
            />
        </motion.svg>
    );
}