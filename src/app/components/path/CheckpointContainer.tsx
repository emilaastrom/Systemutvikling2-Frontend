import React, { useContext, useState, useMemo, useCallback } from "react";
import Checkpoint from "@/app/components/path/Checkpoint";
import { PathContext } from "@/app/hooks/PathProvider";
import { Vector } from "@/util/types/vector";


export default function CheckpointContainer() {
    const completedChallenges = useMemo(() => [
        {
            id: 1,
            passed: true
        },
        {
            id: 2,
            passed: false
        },
        {
            id: 3,
            passed: false
        },
        {
            id: 4,
            passed: true
        },
        {
            id: 5,
            passed: false
        },
        {
            id: 6,
            passed: true
        },
        {
            id: 7,
            passed: true
        },
        {
            id: 8,
            passed: true
        },
        {
            id: 9,
            passed: false
        },
        {
            id: 10,
            passed: true
        },
        {
            id: 11,
            passed: true
        },
        {
            id: 12,
            passed: true
        },
        {
            id: 13,
            passed: true
        },
        {
            id: 14,
            passed: false
        },
        {
            id: 15,
            passed: false
        },
        {
            id: 16,
            passed: true
        },
        {
            id: 17,
            passed: false
        },
        {
            id: 18,
            passed: true
        },
        {
            id: 19,
            passed: true
        },
        {
            id: 20,
            passed: true
        },
    ], []);

    const { bounds, pathFunction, worldToScreen } = useContext(PathContext);
    const [size, setSize] = useState(40);

    const calculateWorldPositions = useCallback((challenges: Array<any>) => {
        const positions: Vector[] = [];
        const numCheckpoints = challenges.length;
        const stepSize = 80;

        for (let i = 0; i < numCheckpoints; i++) {
            const t = i * stepSize;
            positions.push({ x: pathFunction(t), y: t });
        }

        return challenges.map((_, index) => positions[index]);
    }, [pathFunction]);

    const worldPositions = useMemo(() => calculateWorldPositions(completedChallenges), [completedChallenges, calculateWorldPositions]);

    const getScreenPos = useCallback((worldPos: Vector) => {
        const screenPos = worldToScreen(worldPos);
        return { x: screenPos.x - (size / 2), y: screenPos.y - (size / 2)};
    }, [worldToScreen, size]);

    const canRender = (worldPos: Vector | null) => {
        if (worldPos) {
            return worldPos.y + size > bounds.x && worldPos.y - size < bounds.y;
        }
        else {
            return false;
        }
    }

    return (
        <div>
            {completedChallenges
                .map((challenge, index) => {
                    const worldPos = worldPositions[index];
                    if (canRender(worldPos)) {
                        return <Checkpoint
                            key={challenge.id}
                            passed={challenge.passed}
                            coords={getScreenPos(worldPos)}
                            size={size}
                        />
                    }
                })
            }
        </div>
    );
}