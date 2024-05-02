import React, { useEffect, useState } from "react";
import GoalHistoryModule from "../components/settings/GoalHistoryModule";
import { useApiHandler } from "../../utils/api";

interface Goal {
    id: string;
    name: string;
    deadline: string;
    completionTime: string;
    active: boolean;
    description: string;
    amount: number;
    progress: number;
    username: string;
}

const GoalHistory = () => {
    const apiHandler = useApiHandler();
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const getAllGoals = async () => {
            try {
                console.log("HENTER MÅL");
                const response = await apiHandler(
                    "goal",
                    "get",
                    "/getAllGoals"
                );
                console.log("DETTE ER SVARET PÅ MÅL: ", response.data);
                setGoals(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllGoals();
    }, []);

    // Filter goals where active is false
    const inactiveGoals = goals.filter(goal => !goal.active);

    return (
        <div className="flex flex-col justify-start gap-4 m-5 overflow-y-auto">
            <div className="font-semibold text-center text-2xl dark:text-white">
                Oversikt over tidligere mål
            </div>
            <div className="flex flex-col text-center items-center pb-12">
                <p className="dark:text-white dark:bg-slate-600">
                    Antall mål fullført: {inactiveGoals.length}
                </p>
                {inactiveGoals.map((goal) => (
                    <GoalHistoryModule
                        key={goal.id}
                        goalDescription={goal.description}
                        startedAt={new Date(goal.deadline)} // Assuming 'deadline' as the start date
                        completedAt={new Date(goal.completionTime)}
                        name={goal.name}
                        active={goal.active}
                        amount={goal.amount}
                        progress={goal.progress}
                    />
                ))}
            </div>
        </div>
    );
};

export default GoalHistory;
