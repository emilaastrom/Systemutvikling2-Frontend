import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import Checkpoint from "@/app/components/path/Checkpoint";
import Milestone from "./Milestone";
import ChallengesFinishedPopup from "@/app/components/ChallengesFinishedPopup";
import { PathContext } from "@/app/hooks/PathProvider";
import {PathApiContext} from "@/app/hooks/PathApiProvider";
import { Vector } from "@/util/types/vector";

export default function PathElements() {
  const { scale, bounds, pathFunction, worldToScreen } = useContext(PathContext);
  const { goals, challenges } = useContext(PathApiContext);

  const [size, setSize] = useState(40);
  const [borderWidth, setBorderWidth] = useState(4);
  useEffect(() => {
    setSize(40 * scale);
    setBorderWidth(4 * scale);
  }, [scale]);

  const checkpointClicked = (id: number) => {
    console.log("Checkpoint clicked: ", id);
    alert("Checkpoint clicked: " + id)
  }

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

        if (i === challenges.length) {
          const goal = goals[j];
          pathElements.push({ type: "milestone", id: goal.id, worldPos: worldPos });
          j++;
          continue;
        }

        if (j === goals.length) {
          const challenge = challenges[i]
          pathElements.push({ type: "checkpoint", id: challenge.id, worldPos: worldPos });
          i++;
          continue;
        }

        const challenge = challenges[i]
        const goal = goals[j];

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
    }, [pathFunction, goals, challenges]
  );

  const getCheckpoint = (index: number, id: number, worldPos: Vector) => {
    if (worldPos.y + size > bounds.x && worldPos.y - size < bounds.y) {
      const challenge = challenges.find((challenge) => challenge.id === id);
      return <Checkpoint
        key={index}
        checkpointClicked={checkpointClicked}
        id={id}
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
      {/*<ChallengesFinishedPopup closePopup={} />*/}
      {getPathElements()}
    </div>
  );
}
