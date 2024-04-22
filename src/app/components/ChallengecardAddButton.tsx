import React, { useState } from 'react';
import ChallengecardAddModal from './ChallengecardAddModal';

const ChallengecardAddButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex h-full justify-center items-center">
                <div 
                    className="w-60 my-4 h-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-fuchsia-100 cursor-pointer hover:bg-fuchsia-200" 
                    onClick={handleAddClick}
                >
                    <div className="h-full p-2 flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-20 h-20 opacity-25">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </div>
            </div>

            {isModalOpen && <ChallengecardAddModal onClose={handleCloseModal} />}
        </>
    );
};

export default ChallengecardAddButton;
