import React, { useState } from 'react';
import ChallengecardModalButton from './ChallengecardModalButton';

type ChallengecardModalProps = {
    onClose: () => void;
    challengeText: string;
    challengeStartDate: Date;
    challengeEndDate: Date;
};

const ChallengecardModal: React.FC<ChallengecardModalProps> = ({ onClose, challengeText, challengeStartDate, challengeEndDate }) => {
    const [currentMonth, setCurrentMonth] = useState<number>(challengeStartDate.getMonth()+1); 
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const generateDates = (month: number, year: number, startDate: Date, endDate: Date) => {
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
        <div onClick={onClose} className="fixed h-screen w-screen inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto">
                <div className="bg-[#b0f4ff] p-4 rounded-t-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    {challengeText}
                </div>
                <div className="flex justify-between m-4 font-semibold">
                    <button 
                        onClick={() => changeMonth(-1)} 
                        disabled={currentYear === challengeStartDate.getFullYear() && currentMonth === challengeStartDate.getMonth()+1}
                        className={currentYear === challengeStartDate.getFullYear() && currentMonth === challengeStartDate.getMonth()+1 ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Prev
                    </button>
                    <div>
                        {`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`}
                    </div>
                    <button 
                        onClick={() => changeMonth(1)} 
                        disabled={currentYear === challengeEndDate.getFullYear() && currentMonth === challengeEndDate.getMonth()+1}
                        className={currentYear === challengeEndDate.getFullYear() && currentMonth === challengeEndDate.getMonth()+1 ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Next
                    </button>

                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-7 bg-gray-100 shadow-md rounded-lg md:text-base text-sm p-4 sm:gap-0 h-96" style={{ maxWidth: 'max-content' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="flex-none sm:p-0 text-center">
                                {day}
                            </div>
                        ))}
                        {generateDates(currentMonth, currentYear, challengeStartDate, challengeEndDate).map((day, index) => (
                            <div key={index} className="flex-none sm:p-0 text-center">
                                <div className={day.enabled ? "" : "opacity-10 cursor-not-allowed pointer-events-none"}>
                                    {day.date ? (
                                        <ChallengecardModalButton 
                                            text={`${day.date}.`}
                                        />
                                    ) : (
                                        <div className="opacity-0">{day.date}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="border-2 bg-white border-red-600 text-red-600 text-center p-3 whitespace-nowrap cursor-pointer m-5 md:w-1/3 w-1/2">
                        Forlat utfordring
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default ChallengecardModal;
