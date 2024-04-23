import React, { useState } from 'react';
import ChallengecardModal from './ChallengecardModal';

const Challengecard = ({
    challenge,
    current,
    max,
    startDate,
    endDate
}: {
    challenge: string;
    current: number;
    max: number;
    startDate: Date;
    endDate: Date;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };
    const calculateDaysLeft = (endDate: Date) => {
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const days = calculateDaysLeft(endDate);

    return (
        <>
            {isModalOpen && <ChallengecardModal onClose={handleCloseModal} challengeText={challenge} challengeStartDate={startDate} challengeEndDate={endDate} />}
            <div className="flex justify-end" onClick={handleCardClick}>
                <div className="w-60 m-4 border-gray-300 rounded-lg overflow-hidden shadow-md text-black bg-white cursor-pointer hover:bg-green-200">
                    <div className="p-2">
                        <div className="h-24 p-2 flex flex-col justify-center items-center">
                            <h2 className="overflow-hidden break-words text-center">{challenge}</h2>
                        </div>
                        <div className="h-17 p-1 flex justify-between items-center">
                            <p className="text-left font-semibold text-l">
                                {current}/{max}
                            </p>
                            <p className="text-right font-semibold text-l">
                                {days} dager igjen
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Challengecard;
