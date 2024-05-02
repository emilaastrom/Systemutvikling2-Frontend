'use client'
import React, {
  useContext,
  useState,
  useMemo,
  useEffect, useRef,
} from "react";

import Milestone from "./Milestone";
import Checkpoint from "@/app/components/path/Checkpoint";
import { PathContext } from "@/app/hooks/PathProvider";
import { Vector } from "@/util/types/vector";
import { useApiHandler } from "@/utils/api";

export default function PathElements() {
  const apiHandler = useApiHandler();
  const goalsRef = useRef([]);

  const fetchGoals = async () => {
    return await apiHandler("goal", "get", "/getAllGoals");
  }
  // fetchGoals().then((response) => {
  //   goalsRef.current = response.data;
  // }).catch((error) => {
  //   console.log(error)
  // });

  const goals = [
    {
      "id": 0,
      "name": "Become a better person",
      "completionTime": "2024-02-01T07:45:30Z",
    },
    {
      "id": 1,
      "name": "Get a job",
      "completionTime": "2024-03-05T07:45:30Z",
    },
    {
      "id": 2,
      "name": "Get a life",
      "completionTime": "2025-06-21T07:45:30Z",
    },
  ]

  const challenges = [
    {
      "id": 0,
      "endDate": "2024-01-05T07:45:30Z",
      "completed": true,
    },
    {
      "id": 1,
      "endDate": "2024-01-19T07:45:30Z",
      "completed": false,
    },
    {
      "id": 2,
      "endDate": "2024-02-01T07:45:30Z",
      "completed": true,
    },
    {
      "id": 3,
      "endDate": "2024-02-13T07:45:30Z",
      "completed": true,
    },
    {
      "id": 4,
      "endDate": "2024-03-01T07:45:30Z",
      "completed": false,
    },
    {
      "id": 5,
      "endDate": "2024-07-30T07:45:30Z",
      "completed": true,
    },
  ];

  const { scale, bounds, pathFunction, worldToScreen } =
    useContext(PathContext);

  const [size, setSize] = useState(40);
  const [borderWidth, setBorderWidth] = useState(4);

  useEffect(() => {
    setSize(40 * scale);
    setBorderWidth(4 * scale);
  }, [scale]);

  type PathElement = {
    type: "checkpoint" | "milestone";
    id: number;
    worldPos: Vector;
  }

  const pathElements = useMemo(
    () => {
      console.log("Entered useMemo")
      const pathElements: PathElement[] = [];
      let i = 0, j = 0;

      while (i < challenges.length || j < goalsRef.current.length) {
        console.log("i: ", i, "j: ", j);
        const t = (i + j) * 80;
        const worldPos = { x: pathFunction(t), y: t }

        const challenge = challenges[i];
        const goal = goalsRef.current[j];

        if (i === challenges.length) {
          pathElements.push({ type: "milestone", id: goal.id, worldPos: worldPos });
          j++;
          continue;
        }

        if (j === goalsRef.current.length) {
          pathElements.push({ type: "checkpoint", id: challenge.id, worldPos: worldPos });
          i++;
          continue;
        }

        const challengeTime = new Date(challenge.endDate);
        const goalTime = new Date(goal.completionTime);

        if (challengeTime <= goalTime) {
          pathElements.push({ type: "checkpoint", id: challenge.id, worldPos: worldPos });
          i++;
        } else {
          pathElements.push({ type: "milestone", id: goal.id, worldPos: worldPos });
          j++;
        }
      }
      return pathElements;
    }, [pathFunction]
  );

  const getCheckpoint = (index: number, id: number, worldPos: Vector) => {
    if (worldPos.y + size > bounds.x && worldPos.y - size < bounds.y) {
      const challenge = challenges.find((challenge) => challenge.id === id);
      return <Checkpoint
        key={index}
        passed={challenge.completed}
        coords={worldToScreen(worldPos)}
        scale={scale}
        size={size}
        borderWidth={borderWidth}
      />
    }
  }

  const getMilestone = (index: number, id: number, worldPos: Vector) => {
    if (worldPos.y > bounds.x && worldPos.y < bounds.y) {
      const goal = goalsRef.current.find((goal) => goal.id === id);
      return <Milestone
        key={index}
        goalName={goal.name}
        coords={worldToScreen(worldPos)}
        scale={scale}
      />
    }
  }

  const getPathElements = () => {
    return pathElements.map((pathElement, index) => {
      const worldPos = pathElement.worldPos;
      if (pathElement.type === "checkpoint") {
        return getCheckpoint(index, pathElement.id, worldPos);
      } else {
        return getMilestone(index, pathElement.id, worldPos);
      }
    });
  }

  return (
    <div>
      {getPathElements()}
    </div>
  );
}
