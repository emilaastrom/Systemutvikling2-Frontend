import React, { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { colors } from "../../../../tailwind.config";
import { Vector } from "@/util/types/vector";
import { PathContext } from "@/app/hooks/PathProvider";
import { PathApiContext } from "@/app/hooks/PathApiProvider";

interface ProceduralPathProps {
    dimensions: Vector;
    stepLength: number;
    width: number;
}

export default function ProceduralPath({ dimensions, stepLength, width }: ProceduralPathProps) {
    const { scale, bounds, pathFunction, worldToScreen } = useContext(PathContext);
    const { pathLength } = useContext(PathApiContext);

    const getPathPoints = useCallback(() => {
        const halfWidth = width / 2;
        const points = [];
        for (let t = Math.max(bounds.x - halfWidth, 0); t < Math.min(bounds.y + halfWidth, pathLength); t += stepLength) {
            points.push({ x: pathFunction(t), y: t });
        }
        return points;
    }, [bounds, stepLength, width, pathFunction, pathLength]);

    const getPathData = useCallback((pathPoints: Vector[]) => {
        if (pathPoints.length === 0) return "";
        const p0 = worldToScreen(pathPoints[0]);
        let pathData = `M ${p0.x},${p0.y} `;
        for (let i = 0; i < pathPoints.length; i++) {
            const p = worldToScreen(pathPoints[i]);
          pathData += `L ${p.x},${p.y} `;
        }
        return pathData;
    }, [worldToScreen]);

    // Calculate path data
    const [pathData, setPathData] = useState("");
    useEffect(() => {
        const pathPoints = getPathPoints();
        setPathData(getPathData(pathPoints));
    }, [getPathPoints, getPathData]);

    // Calculate stroke width
    const [strokeWidth, setStrokeWidth] = useState(0);
    useEffect(() => {
      setStrokeWidth(width * scale);
    }, [width, scale]);

    return (
        <motion.svg viewBox={`0 0 ${dimensions.x} ${dimensions.y}`}>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{stopColor: colors.path.dark, stopOpacity: 1}}/>
                    <stop offset="75%" style={{stopColor: colors.path.dark, stopOpacity: 1}}/>
                    <stop offset="95%" style={{stopColor: colors.path.dark, stopOpacity: 0}}/>
                </linearGradient>
            </defs>
            <motion.path
                d={pathData}
                fill={"none"}
                stroke={"url(#gradient)"}
                strokeWidth={strokeWidth}
                strokeLinecap={"round"}
            />
        </motion.svg>
    );
}