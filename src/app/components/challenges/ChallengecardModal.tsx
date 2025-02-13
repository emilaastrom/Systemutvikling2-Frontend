import React, { useEffect, useState } from "react";
import CustomIcon from "../icons/CustomIcon";
import { useApiHandler } from "@/utils/api";

type ChallengecardModalProps = {
  onClose: () => void;
  challengeText: string;
  challengeStartDate: Date;
  challengeEndDate: Date;
  id: string;
  subStatus: boolean[];
  max: number;
};

const generateDates = (
  currentMonth: number,
  currentYear: number,
  startDate: Date,
  endDate: Date,
) => {
  const dates = [];
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  for (let i = 0; i < startOffset; i++) {
    dates.push({
      date: 0,
      enabled: false,
      uniqueId: `${currentYear}-${currentMonth}-0-${i}`,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(currentYear, currentMonth - 1, i);
    const uniqueId = `${currentYear}-${currentMonth}-${i}`;
    const isEnabled = currentDate >= startDate && currentDate < endDate;

    dates.push({
      date: i,
      enabled: isEnabled,
      uniqueId: uniqueId,
    });
  }

  return dates;
};

const generateEnabledDates = (startDate: Date, endDate: Date) => {
  const enabledDates = [];

  // Iterate through each month between start and end dates
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(year, month - 1, i);
      enabledDates.push({
        date: i,
        enabled: currentDay >= startDate && currentDay < endDate,
        uniqueId: `${year}-${month}-${i}`,
      });
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return enabledDates;
};

const ChallengecardModal: React.FC<ChallengecardModalProps> = ({
  onClose,
  challengeText,
  challengeStartDate,
  challengeEndDate,
  id,
  subStatus,
  max
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    challengeStartDate.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    challengeStartDate.getFullYear()
  );
  const [saveButtonText, setSaveButtonText] = useState<string>(
    "Lagre endringer"
  );

  const apiHandler = useApiHandler();

  const enabledDates = generateEnabledDates(
    challengeStartDate,
    challengeEndDate
  );

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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

  const deleteChallenge = () => {
    const confirmation = window.confirm(
      "Er du sikker på at du vil slette denne utfordingen? "
    );
    if (confirmation) {
      apiHandler("challenge", "post", "/removeAssignedChallenge", {
        id: id,
      });
      setTimeout(function () {
        onClose();
      }, 300);
    }
  };

  const saveProgress = () => {
    const clickedStatusArray = Object.values(clickedStatus);
    const body = { id: id, subStatus: clickedStatusArray };
    console.log(body);
    apiHandler("challenge", "put", "/updateProgress", body);
    setTimeout(function () {
    if(saveButtonText === "Fullfør utfordring" ){
      apiHandler("challenge", "post", "/finishChallenge",{id:id})
      alert("Gratulerer! Du fullførte en utfordring!")
      setTimeout(function () {
      onClose()
    }, 300);
    } else{
    onClose();
  }
  }, 300);
  };

  const dates = generateDates(
    currentMonth,
    currentYear,
    challengeStartDate,
    challengeEndDate
  );

  const initialClickedStatus = {};
  enabledDates.forEach((date) => {
    if (date.enabled) {
      initialClickedStatus[date.uniqueId] = false;
    }
  });

  const [clickedStatus, setClickedStatus] = useState(initialClickedStatus);

  const handleClick = (uniqueId: string) => {
    setClickedStatus((prevState) => {
      const updatedState = {
        ...prevState,
        [uniqueId]: !prevState[uniqueId],
      };
  
      const trueCount = Object.values(updatedState).filter((value) => value === true).length;
  
      if (trueCount >= max) {
        setSaveButtonText("Fullfør utfordring");
      } else {
        setSaveButtonText("Lagre endringer");
      }
  
      return updatedState;
    });
  };
  

  const initialStatus = () => {
    const newClickedStatus = { ...clickedStatus };
    let n = 0
    let daysToFirstEnabled = 0
    for (let i = 0; i < enabledDates.length; i++) {
      if(daysToFirstEnabled===0 && enabledDates[i].enabled){
          daysToFirstEnabled=n;
          break
          }
        n++
        }
        n=0
    for (let i = 0; i < enabledDates.length; i++) {
        if (subStatus[n]) {
            const uniqueId = enabledDates[i+daysToFirstEnabled].uniqueId;
            newClickedStatus[uniqueId] = true;
        }
        n++
    }

    setClickedStatus(newClickedStatus);
  };

  useEffect(() => {
    initialStatus();
  }, []);

  return (
    <div onClick={onClose} className="modal-container" data-testid="challengecard-modal">
      <div
        onClick={stopPropagation}
        className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto"
      >
        <div className="bg-[#b0f4ff] p-4 rounded-t-lg w-full max-h-1/4 text-center relative font-semibold overflow-auto">
          <div className="flex-grow flex justify-center items-center">
            {challengeText}
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
        <div className="flex justify-between m-4 font-semibold">
          <button
            onClick={() => changeMonth(-1)}
            disabled={
              currentYear === challengeStartDate.getFullYear() &&
              currentMonth === challengeStartDate.getMonth() + 1
            }
            className={
              currentYear === challengeStartDate.getFullYear() &&
              currentMonth === challengeStartDate.getMonth() + 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          >
            <CustomIcon
              className={""}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              }
            />
          </button>
          <div>
            {`${new Date(currentYear, currentMonth - 1).toLocaleString(
              "default",
              { month: "long" }
            )} ${currentYear}`}
          </div>
          <button
            onClick={() => changeMonth(1)}
            disabled={
              currentYear === challengeEndDate.getFullYear() &&
              currentMonth === challengeEndDate.getMonth() + 1
            }
            className={
              currentYear === challengeEndDate.getFullYear() &&
              currentMonth === challengeEndDate.getMonth() + 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          >
            <CustomIcon
              className={""}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              }
            />
          </button>
        </div>
        <div className="flex justify-center">
          <div
            className="grid grid-cols-7 bg-gray-100 shadow-md rounded-lg md:text-base text-sm p-4 sm:gap-0 h-96"
            style={{ maxWidth: "max-content" }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="flex-none sm:p-0 text-center">
                {day}
              </div>
            ))}
            {dates.map((day, index) => (
              <div key={day.uniqueId} className="flex-none sm:p-0 text-center">
                <div
                  className={
                    day.enabled
                      ? ""
                      : "opacity-10 cursor-not-allowed pointer-events-none"
                  }
                >
                  {day.date ? (
                    <div className="flex justify-center items-center">
                      <div
                        className={`w-14 h-14 border-2 border-gray-300 rounded-lg shadow-lg cursor-pointer flex justify-center items-center ${
                          clickedStatus[day.uniqueId]
                            ? "bg-green-200"
                            : "bg-white"
                        }`}
                        onClick={() => handleClick(day.uniqueId)}
                      >
                        {day.date}
                      </div>
                    </div>
                  ) : (
                    <div className="opacity-0">{day.date}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div
            onClick={deleteChallenge}
            className="border-2 bg-white border-red-600 text-black text-center p-3 whitespace-nowrap cursor-pointer m-5 md:w-1/3 w-1/2"
          >
            Slett utfordring
          </div>
          <div
            onClick={saveProgress}
            className={`border-2 border-green-600 text-black text-center p-3 whitespace-nowrap cursor-pointer m-5 md:w-1/3 w-1/2 ${
              saveButtonText === "Fullfør utfordring" ? "bg-green-600 text-white" : ""
            }`}
            
          >
            {saveButtonText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengecardModal;
