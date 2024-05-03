import React, { useState } from 'react';
import ChallengecardModal from './ChallengecardModal';

const Challengecard = ({
    id,
    challenge,
    title,
    current,
    max,
    startDate,
    endDate,
    subStatus,
    difficulty,
    onClose
}: {
    id: string,
    challenge: string;
    title: string;
    current: number;
    max: number;
    startDate: Date;
    endDate: Date;
    subStatus: boolean[];
    difficulty: string;
    onClose: () => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose()
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

    var days = calculateDaysLeft(endDate);
    if(difficulty==="HARD"){
        max = (Math.floor(max/100*100))
    } else if(difficulty==="MEDIUM"){
        max = (Math.floor(max/100*80))
    } else if(difficulty==="EASY"){
        max = (Math.floor(max/100*50))
    }

    if(current>max){
        current=max
    } else {
    }

    return (
        <>
            {isModalOpen && <ChallengecardModal onClose={handleCloseModal} challengeText={title} challengeStartDate={startDate} challengeEndDate={endDate} id={id} subStatus={subStatus} max={max}/>}
            <div className="flex justify-end" onClick={handleCardClick} data-testid="challenge-card">
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
