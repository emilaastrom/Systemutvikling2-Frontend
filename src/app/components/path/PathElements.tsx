import React, { useContext, useState, useMemo, useEffect } from "react";

import Checkpoint from "@/app/components/path/Checkpoint";
import Milestone from "./Milestone";
import { PathContext } from "@/app/hooks/PathProvider";
import { PathApiContext } from "@/app/hooks/PathApiProvider";
import { Vector } from "@/util/types/vector";
import {ActiveChallenge} from "@/util/types/Challenge";

type PathElementsProps = {
  openCheckpointModal: (activeChallenge: ActiveChallenge | null) => void;
};

export default function PathElements({ openCheckpointModal }: PathElementsProps) {
  const { scale, bounds, pathFunction, worldToScreen } =
    useContext(PathContext);
  const { goals, activeChallenges } = useContext(PathApiContext);

  const [size, setSize] = useState(40);
  const [borderWidth, setBorderWidth] = useState(4);
  useEffect(() => {
    setSize(40 * scale);
    setBorderWidth(4 * scale);
  }, [scale]);

  const checkpointClicked = (activeChallenge: ActiveChallenge) => {
    openCheckpointModal(activeChallenge);
  }

  type PathElement = {
    type: "checkpoint" | "milestone";
    id: string;
    worldPos: Vector;
  };

  const pathElements = useMemo(() => {
    const pathElements: PathElement[] = [];
    let i = 0,
      j = 0;

    while (i < activeChallenges.length || j < goals.length) {
      const t = (i + j) * 80;
      const worldPos = { x: pathFunction(t), y: t };

      if (i === activeChallenges.length) {
        const goal = goals[j];
        pathElements.push({
          type: "milestone",
          id: goal.id,
          worldPos: worldPos,
        });
        j++;
        continue;
      }

      if (j === goals.length) {
        const assignedChallenge = activeChallenges[i].assignedChallenge;
        pathElements.push({
          type: "checkpoint",
          id: assignedChallenge.id,
          worldPos: worldPos,
        });
        i++;
        continue;
      }

      const assignedChallenge = activeChallenges[i].assignedChallenge;
      const goal = goals[j];

      const challengeTime = new Date(assignedChallenge.endDate);
      const goalTime = new Date(goal.completionTime);

      if (challengeTime <= goalTime) {
        pathElements.push({
          type: "checkpoint",
          id: assignedChallenge.id,
          worldPos: worldPos,
        });
        i++;
      } else {
        pathElements.push({
          type: "milestone",
          id: goal.id,
          worldPos: worldPos,
        });
        j++;
      }
    }
    return pathElements;
  }, [pathFunction, goals, activeChallenges]);

  const getCheckpoint = (index: number, id: string, worldPos: Vector) => {
    if (worldPos.y + size > bounds.x && worldPos.y - size < bounds.y) {
      const activeChallenge = activeChallenges.find((activeChallenge) => activeChallenge.assignedChallenge.id === id);
      return (
        <Checkpoint
          key={index}
          checkpointClicked={checkpointClicked}
          activeChallenge={activeChallenge}
          coords={worldToScreen(worldPos)}
          scale={scale}
          size={size}
          borderWidth={borderWidth}
        />
      );
    }
  }

  const getMilestone = (index: number, id: string, worldPos: Vector) => {
    if (worldPos.y > bounds.x && worldPos.y < bounds.y) {
      const goal = goals.find((goal) => goal.id === id);
      return (
        <Milestone
          key={index}
          goalName={goal.name}
          coords={worldToScreen(worldPos)}
          scale={scale}
        />
      );
    }
  };

  const getPathElements = () => {
    return pathElements.map((pathElement, index) => {
      const worldPos = pathElement.worldPos;
      if (pathElement.type === "checkpoint") {
        return getCheckpoint(index, pathElement.id, worldPos);
      } else {
        return getMilestone(index, pathElement.id, worldPos);
      }
    });
  };

  return <div>{getPathElements()}</div>;
}
