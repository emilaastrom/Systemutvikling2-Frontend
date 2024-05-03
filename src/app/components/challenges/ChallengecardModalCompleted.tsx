import React, { useState } from "react";
import CustomIcon from "../icons/CustomIcon";
import { ActiveChallenge, AssignedChallenge, Challenge } from "@/util/types/Challenge";

type ChallengecardModalProps = {
  onClose: () => void;
  activeChallenge: ActiveChallenge;
};

const ChallengecardModal: React.FC<ChallengecardModalProps> = ({ onClose, activeChallenge }) => {
  const assignedChallenge: AssignedChallenge = activeChallenge.assignedChallenge;
  const challenge: Challenge = activeChallenge.challenge;

  const challengeText = challenge.description;
  const challengeStartDate = new Date(assignedChallenge.startDate);
  const challengeEndDate = new Date(assignedChallenge.endDate);

  const [currentMonth, setCurrentMonth] = useState<number>(
    challengeStartDate.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const generateDates = (
    month: number,
    year: number,
    startDate: Date,
    endDate: Date
  ) => {
    const startDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0);
    const startOffset = startDay.getDay();
    const endOffset = endDay.getDay();

    const dates = [];

    for (let i = 1; i <= endDay.getDate(); i++) {
      const currentDate = new Date(year, month - 1, i);

      if (currentDate >= startDate && currentDate <= endDate) {
        dates.push({ date: i, enabled: true });
      } else {
        dates.push({ date: i, enabled: false });
      }
    }

    for (let i = 0; i < startOffset; i++) {
      dates.unshift({ date: 0, enabled: false });
    }

    for (let i = endOffset; i < 6; i++) {
      dates.push({ date: 0, enabled: false });
    }

    return dates;
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div
      onClick={onClose}
      className="fixed h-screen w-screen inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={stopPropagation}
        className="bg-white md:h-1/3 min-h-80 rounded-lg w-screen md:w-1/2 m-5 overflow-auto"
      >
        <div className="bg-[#b0f4ff] p-4 rounded-t-lg w-full max-h-1/4 text-center relative font-semibold overflow-auto">
          <div className="flex-grow flex justify-center items-center">
            Utfordringshistorikk
          </div>
          <button className="absolute top-0 right-0 m-4" onClick={onClose}>
            <CustomIcon
              className={""}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              }
            />
          </button>
        </div>
        <div className="flex flex-col m-4 items-center font-semibold space-y-2">
          <h1 className="py-12">
            Beskrivelse: <span className="font-normal">{challengeText}</span>
          </h1>
          <p>
            Startet: <span className="font-normal">{challengeStartDate.toDateString()}</span>
          </p>
          <p>
            Ferdig: <span className="font-normal">{challengeEndDate.toDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengecardModal;
