import React, { useEffect, useState} from "react";
import { useApiHandler } from "@/utils/api";
import { ActiveChallenge } from "@/util/types/Challenge";
import { Goal } from "@/util/types/Goal";

interface PathApiContextType {
  goals: Goal[];
  activeChallenges: ActiveChallenge[];
  username: string;
  startPosition: number;
}

interface PathApiProviderProps {
  children: React.ReactNode;
}

export const PathApiContext = React.createContext<PathApiContextType>({
  goals: [],
  activeChallenges: [],
  username: "",
  startPosition: -200,
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

  const [username, setUsername] = useState("");
  const fetchUsername = async () => {
    await apiHandler("user", "get", "/getUser").then((response) => {
      setUsername(response.data.username);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchGoals();
    fetchChallenges();
    fetchUsername();
  }, []);

  const [startPosition, setStartPosition] = useState(-200);
  useEffect(() => {
    setStartPosition(((goals.length + activeChallenges.length) * 80) - 200);
  }, [goals, activeChallenges]);

  return (
    <PathApiContext.Provider value={{goals, activeChallenges, username, startPosition}}>
      {children}
    </PathApiContext.Provider>
  );
}

export default PathApiProvider;