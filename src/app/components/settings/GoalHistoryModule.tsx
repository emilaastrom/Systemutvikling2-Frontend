import React from "react";

// Updated interface with optional properties
interface GoalHistoryModuleProps {
  goalDescription: string; // This prop must be a string
  startedAt: Date; // This prop must be a Date object
  completedAt: Date; // This prop must be a Date object
  name?: string; // Optional string
  active?: boolean; // Optional boolean
  amount?: number; // Optional number
  progress?: number; // Optional number
  username?: string; // Optional string
}

const GoalHistoryModule: React.FC<GoalHistoryModuleProps> = ({
  goalDescription,
  startedAt,
  completedAt,
  name,
  active,
  amount,
  progress,
  username,
}) => {
  return (
    <div className="bg-white border-grass-dark border-2 rounded-xl p-5 text-black m-2 md:w-2/3 w-full shadow-sm flex flex-col items-center justify-center">
      <div className="dark:text-white dark:bg-slate-600">{goalDescription}</div>
      <div className="font-semibold">{name && <div>Mål: {name}</div>}</div>
      <div>{active !== null && <div>Status: {active ? 'Aktiv' : 'Inaktiv'}</div>}</div>
      <div>{progress !== null && <div>{progress} kr spart av {amount} kr</div>}</div>
      <div className="pt-6">Påbegynt: {startedAt && startedAt.toLocaleDateString()}</div>
      <div>Fullført: {completedAt && completedAt.toLocaleDateString()}</div>
    </div>
  );
};

export default GoalHistoryModule;
