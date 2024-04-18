import React, { useState } from 'react';
import ChallengecardModal from './ChallengecardModal';

const Challengecard = ({
    challenge,
    current,
    max,
    days
}: {
    challenge: string;
    current: number;
    max: number;
    days: number;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <ChallengecardModal onClose={handleCloseModal} challengeText={challenge} />}
            <div className="flex justify-center" onClick={handleCardClick}>
                <div className="w-60 m-4 border border-gray-300 rounded-lg overflow-hidden shadow-md bg-green-100 cursor-pointer hover:bg-green-200">
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
