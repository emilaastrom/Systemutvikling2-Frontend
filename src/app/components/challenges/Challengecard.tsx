import React, { useState } from 'react';
import ChallengecardModal from './ChallengecardModal';

const Challengecard = ({
    id,
    challenge,
    current,
    max,
    startDate,
    endDate
}: {
    id: string,
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
            {isModalOpen && <ChallengecardModal onClose={handleCloseModal} challengeText={challenge} challengeStartDate={startDate} challengeEndDate={endDate} id={id}/>}
            <div className="flex justify-end" onClick={handleCardClick}>
            <div 
                className="w-80 m-4 rounded-lg overflow-hidden relative cursor-pointer" 
                style={{ 
                    background: "url('cloud.svg')", 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: '320px 135px'
                }}
                onMouseOver={(e) => { 
                    e.currentTarget.style.backgroundImage = "url('cloudgrey.svg')";
                }}
                onMouseOut={(e) => { 
                    e.currentTarget.style.backgroundImage = "url('cloud.svg')";
                }}
            > 
            <div className="p-2 text-dark">
                        <div className="h-24 pt-2 flex flex-col justify-center items-center">
                            <h2 className="px-10 pt-5 overflow-hidden break-words text-center">{challenge}</h2>
                        </div>
                        <div className="h-17 flex justify-center items-center">
                            <p className="text-left font-semibold pr-5 text-l">
                                {current}/{max}
                            </p>
                            <p className="text-right pl-4 font-semibold text-l">
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
