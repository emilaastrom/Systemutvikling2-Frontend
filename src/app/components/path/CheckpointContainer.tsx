import React, { useContext, useState } from "react";
import Checkpoint from "@/app/components/path/Checkpoint";
import { NoiseContext } from "@/app/hooks/NoiseProvider";
import {Vector} from "@/util/types/vector";


export default function CheckpointContainer({dimensions, position}: {dimensions: Vector, position: number }) {
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

    const { pathFunction } = useContext(NoiseContext);
    const [size, setSize] = useState(40);
    const yIncrement = 80;

    const getCheckpointCoords = (index: number) => {
        const y = -yIncrement * index - position + dimensions.y;
        const x = pathFunction(y);
        return { x: x - (size / 2), y: y - (size / 2)}
    }

    return (
        <div>
            {completedChallenges.map((challenge, index) => (
                <Checkpoint
                    key={challenge.id}
                    passed={challenge.passed}
                    coords={getCheckpointCoords(index)}
                    size={size}
                />
            ))}
        </div>
    );
}