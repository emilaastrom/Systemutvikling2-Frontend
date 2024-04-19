import React, { useState } from 'react';
import ChallengecardModalButton from './ChallengecardModalButton';

type ChallengecardModalProps = {
    onClose: () => void;
    challengeText: string;
};

const ChallengecardModal: React.FC<ChallengecardModalProps> = ({ onClose, challengeText }) => {
    const [currentMonth, setCurrentMonth] = useState<number>(1); // January
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const generateDates = (month: number, year: number) => {
        const startDate = new Date(year, month - 1, 1).getDay(); // Start day of the month
        const endDate = new Date(year, month, 0).getDate(); // Last day of the month
        const dates = Array.from({ length: startDate === 0 ? 6 : startDate - 1 }, () => 0); // Fill with empty dates for start
        for (let i = 1; i <= endDate; i++) {
            dates.push(i);
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
            {/* Modal content */}
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto">
                <div className="bg-green-200 p-4 rounded-t-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    {challengeText}
                </div>
                <div className="flex justify-between m-4 font-semibold">
                    <button onClick={() => changeMonth(-1)}>Prev</button>
                    <div>
                        {`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`}
                    </div>
                    <button onClick={() => changeMonth(1)}>Next</button>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-7 md:text-base text-sm p-4 sm:gap-0" style={{ maxWidth: 'max-content' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="flex-none sm:p-0 text-center">
                                {day}
                            </div>
                        ))}
                        {generateDates(currentMonth, currentYear).map((date, index) => (
                            <div key={index} className="flex-none sm:p-0 text-center">
                                {date ? (
                                    <ChallengecardModalButton 
                                        text={`${date}.`}
                                    />
                                ) : (
                                    <div className="opacity-0">{date}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="border-2 border-red-400 text-red-400 text-center p-3 whitespace-nowrap cursor-pointer m-5 md:w-1/3 w-1/2">
                        Forlat utfordring
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengecardModal;
