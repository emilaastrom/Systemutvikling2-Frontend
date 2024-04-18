import React from 'react';
import ChallengecardModalButton from './ChallengecardModalButton';

type ChallengecardModalProps = {
    onClose: () => void;
    challengeText: string;
};

const ChallengecardModal: React.FC<ChallengecardModalProps> = ({ onClose, challengeText }) => {

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const generateDates = (start: number, end: number) => {
        const dates = [];
        for (let i = start; i <= end; i++) {
            dates.push(i);
        }
        return dates;
    };

    return (
        <div onClick={onClose} className="fixed h-screen w-screen inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal content */}
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto">
                <div className="bg-green-200 p-4 rounded-t-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    {challengeText}
                </div>
                <div className="text-center font-semibold">
                    January
                </div>
                <div className="grid grid-cols-7 md:text-base sm:text-xs md:gap-2 p-4 sm:gap-0 ">
                    {generateDates(1, 31).map((date) => (
                        <div key={date} className="flex-none p-0.5 sm:p-0">
                            <ChallengecardModalButton 
                                text={`${date}.`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengecardModal;
