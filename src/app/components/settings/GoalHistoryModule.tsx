import React from "react";

interface GoalHistoryModuleProps {
  goalDescription: string; // This prop must be a string
  startedAt: Date; // This prop must be a Date object
  completedAt: Date; // This prop must be a Date object
}

const GoalHistoryModule: React.FC<GoalHistoryModuleProps> = ({
  goalDescription,
  startedAt,
  completedAt,
}) => {
  // Deconstruct goalDescription from props for use in the component
  // TODO button links to goal on homescreen path
  return (
    <div className="bg-white border-grass-dark border-2 rounded-xl p-5 text-black m-2 md:w-2/3 w-full  shadow-sm flex items-center justify-center">
      <button disabled className="text-center w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <span className="font-semibold">{goalDescription}</span>
          <span className="flex justify-center w-full pt-6">
            Påbegynt: {startedAt.toLocaleDateString()}
          </span>
          <span className="flex justify-center w-full">
            Fullført: {completedAt.toLocaleDateString()}
          </span>
        </div>
      </button>
    </div>
  );
};

export default GoalHistoryModule;
