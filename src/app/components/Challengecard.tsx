
import React, { useState } from 'react';
import ChallengecardModal from './ChallengecardModal';

const Challengecard = ({
    challenge,
    current,
    max
}: {
    challenge: string;
    current: number;
    max: number;
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
                    <div className="p-5 ">
                        <div className="h-28 p-2 flex flex-col justify-center items-center ">
                            <h2 className=" overflow-hidden font-semibold break-words text-center">{challenge}</h2>
                        </div>
                        <div className="h-14 p-1 flex flex-col justify-center items-center ">
                            <h1 className="text-center font-bold text-4xl">
                                {current}/{max}
                            </h1>
                        </div>
                    </div>
                </div>
</div>
        </>
    );
};

export default Challengecard;
