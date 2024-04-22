import React, {MutableRefObject, useContext} from "react";
import Checkpoint from "@/app/components/path/Checkpoint";
import { NoiseContext } from "@/app/hooks/NoiseProvider";
import {Vector} from "@/util/types/vector";


export default function CheckpointContainer({dimensions, position}: {dimensions: Vector, position: MutableRefObject<number> }) {
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
        }
        ];

    const { pathFunction } = useContext(NoiseContext);
    const yIncrement = 80;

    const getCheckpointCoords = (index: number) => {
        const y = yIncrement * index - position.current;
        const x = pathFunction(y);
        return { x: x, y: y }
    }

    return (
        <div>
            {completedChallenges.map((challenge, index) => (
                <Checkpoint
                    key={challenge.id}
                    passed={challenge.passed}
                    coords={getCheckpointCoords(index)}
                    size={40}
                />
            ))}
        </div>
    );
}