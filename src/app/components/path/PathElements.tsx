import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import Milestone from "./Milestone";
import Checkpoint from "@/app/components/path/Checkpoint";
import { PathContext } from "@/app/hooks/PathProvider";
import { Vector } from "@/util/types/vector";

export default function PathElements() {

  const goals = useMemo(
    () => [
      {
        "id": 1,
        "name": "Goal 1",
        "completionTime": "2024-03-30T07:45:30Z",
        "amount": 2000,
      },
      {
        "id": 2,
        "name": "Goal 2",
        "completionTime": "2024-06-30T07:45:30Z",
        "amount": 5500,
      },
      {
        "id": 3,
        "name": "Goal 3",
        "completionTime": "2024-09-30T07:45:30Z",
        "amount": 8000,
      },
      {
        "id": 4,
        "name": "Goal 4",
        "completionTime": "2024-12-30T07:45:30Z",
        "amount": 10000,
      },
    ], []
  );

  const challenges = useMemo(
    () => [
      {
        "id": 0,
        "endDate": "2024-01-30T07:45:30Z",
        "completed": true,
      },
      {
        "id": 1,
        "endDate": "2024-02-30T07:45:30Z",
        "completed": false,
      },
      {
        "id": 2,
        "endDate": "2024-04-28T07:45:30Z",
        "completed": true,
      },
      {
        "id": 3,
        "endDate": "2024-04-29T07:45:30Z",
        "completed": true,
      },
      {
        "id": 4,
        "endDate": "2024-05-30T07:45:30Z",
        "completed": false,
      },
      {
        "id": 5,
        "endDate": "2024-07-30T07:45:30Z",
        "completed": true,
      },
    ], []
  );

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
      const pathElements: PathElement[] = [];
      let i = 0, j = 0;

      while (i < challenges.length || j < goals.length) {
        const t = (i + j) * 80;
        const worldPos = { x: pathFunction(t), y: t }

        const challenge = challenges[i];
        const goal = goals[j];

        if (i === challenges.length) {
          pathElements.push({ type: "milestone", id: goal.id, worldPos: worldPos });
          j++;
          continue;
        }

        if (j === goals.length) {
          pathElements.push({ type: "checkpoint", id: challenge.id, worldPos: worldPos });
          i++;
          continue;
        }

        const challengeTime = new Date(challenge.endDate);
        const goalTime = new Date(goal.completionTime);

        if (challengeTime < goalTime) {
          pathElements.push({ type: "checkpoint", id: challenge.id, worldPos: worldPos });
          i++;
        } else {
          pathElements.push({ type: "milestone", id: goal.id, worldPos: worldPos });
          j++;
        }
      }
      return pathElements;
    }, [goals, challenges, pathFunction]
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
      const goal = goals.find((goal) => goal.id === id);
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
