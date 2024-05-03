import React, { useEffect, useState} from "react";
import { useApiHandler } from "@/utils/api";
import { ActiveChallenge, AssignedChallenge } from "@/util/types/Challenge";
import { Goal } from "@/util/types/Goal";

interface PathApiContextType {
  pathLength: number;
  goals: Goal[];
  activeChallenges: ActiveChallenge[];
}

interface PathApiProviderProps {
  children: React.ReactNode;
}

export const PathApiContext = React.createContext<PathApiContextType>({
  pathLength: 0,
  goals: [],
  activeChallenges: [],
});

const PathApiProvider: React.FC<PathApiProviderProps> = ({children}) => {
  const apiHandler = useApiHandler();

  const [goals, setGoals] = useState([]);
  const fetchGoals = async () => {
    await apiHandler("goal", "get", "/getAllGoals").then((response) => {
      const goals: Goal[] = response.data.filter((goal: Goal) => !goal.active);
      setGoals(goals);
    }).catch((error) => {
      console.log(error);
    });
  };

  const [activeChallenges, setActiveChallenges] = useState([]);
  const fetchChallenges = async () => {
    await apiHandler("challenge", "get", "/getFinishedChallenges").then((response) => {
      setActiveChallenges(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    fetchGoals();
    fetchChallenges();
  }, []);

  useEffect(() => {
    setPathLength((goals.length + activeChallenges.length) * 80);
  }, [goals, activeChallenges]);

  return (
    <PathApiContext.Provider value={{pathLength, goals, activeChallenges}}>
      {children}
    </PathApiContext.Provider>
  );
}

export default PathApiProvider;