import { useEffect } from "react";
import GoalHistoryModule from "../../components/settings/GoalHistoryModule";
import { useApiHandler } from "@/utils/api";

const GoalHistory = () => {
  return (
    <div className="flex flex-col justify-start gap-4 m-5 overflow-y-auto">
      <div className="font-semibold text-center text-2xl">
        Oversikt over tidligere mål
      </div>
      <div className="flex flex-col text-center items-center pb-12">
        <GoalHistoryModule
          goalDescription={"Nytt headset!"}
          startedAt={new Date("2023-01-01")}
          completedAt={new Date()}
        />
        <GoalHistoryModule
          goalDescription={"Tur til Italia!"}
          startedAt={new Date()}
          completedAt={new Date()}
        />
      </div>
    </div>
  );
};

export default GoalHistory;
