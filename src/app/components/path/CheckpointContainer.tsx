import React, { useContext, useState, useMemo } from "react";
import Checkpoint from "@/app/components/path/Checkpoint";
import { NoiseContext } from "@/app/hooks/NoiseProvider";
import {Vector} from "@/util/types/vector";


export default function CheckpointContainer() {
    const completedChallenges = [
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
        ];

    const { bounds, pathFunction, worldToScreen } = useContext(NoiseContext);
    const [size, setSize] = useState(40);
    const yIncrement = 80;

    const getCheckpointCoords = (index: number) => {
        const t = index * yIncrement;
        const worldPos = pathFunction(t);

        if (worldPos.y + size > bounds.x && worldPos.y - size < bounds.y) {
            const screenPos = worldToScreen(worldPos);
            return { x: screenPos.x - (size / 2), y: screenPos.y - (size / 2)};
        }
        else {
            return null;
        }
    }

    return (
        <div>
            {completedChallenges
                .map((challenge, index) => {
                    const coords = getCheckpointCoords(index);
                    if (coords) {
                        return <Checkpoint
                            key={challenge.id}
                            passed={challenge.passed}
                            coords={coords}
                            size={size}
                        />
                    }
                })
            }
        </div>
    );
}