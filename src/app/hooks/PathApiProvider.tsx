import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useApiHandler } from "@/utils/api";

interface PathApiContextType {
  goals: any[];
  challenges: any[];
}

interface PathApiProviderProps {
  children: React.ReactNode;
}

export const PathApiContext = React.createContext<PathApiContextType>({
  goals: [],
  challenges: [],
});

const PathApiProvider: React.FC<PathApiProviderProps> = ({children}) => {
  const apiHandler = useApiHandler();

  const [goals, setGoals] = useState([]);
  const fetchGoals = async () => {
    await apiHandler("goal", "get", "/getAllGoals").then((response) => {
      const goals = response.data.filter(goal => !goal.active);
      setGoals(goals);
    }).catch((error) => {
      console.log(error);
    });
  };

  const [challenges, setChallenges] = useState([]);
  const fetchChallenges = async () => {
    await apiHandler("challenge", "get", "/getFinishedChallenges").then((response) => {
      const challenges = response.data.map((challenge) => challenge.assignedChallenge);
      setChallenges(challenges);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchGoals();
    fetchChallenges();
  }, []);

  return (
    <PathApiContext.Provider value={{goals, challenges}}>
      {children}
    </PathApiContext.Provider>
  );
}

export default PathApiProvider;