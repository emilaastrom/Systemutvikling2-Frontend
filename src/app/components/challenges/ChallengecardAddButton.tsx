import React from 'react';
import { useState } from 'react';
import ChallengecardAddModal from './ChallengecardAddModal';

interface ChallengecardAddButtonProps {
    reloadFunction: () => void;
    amount: number;
}

const ChallengecardAddButton: React.FC<ChallengecardAddButtonProps> = ({ reloadFunction, amount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reloadFunction();
    };

    const handleAddClick = () => {
        if (amount >= 6) {
            alert("Du kan ikke ha flere enn 6 utfordringer");
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className="flex h-36 justify-center items-center">
                <div
                    id="add-challenge-button"
                    className="w-80 m-4 h-36 rounded-lg overflow-hidden relative cursor-pointer"
                    style={{
                        background: "url('cloudpinkhover.svg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '320px 135px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundImage = "url('cloudpink.svg')";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundImage = "url('cloudpinkhover.svg')";
                    }}
                    onClick={handleAddClick}
                    data-testid="add-button" // Add test ID to the button
                >
                    <div className="h-full flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-20 h-20 opacity-25">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </div>
            </div>

            {isModalOpen && <ChallengecardAddModal onClose={handleCloseModal} data-testid="challengecard-add-modal" />} {/* Add test ID to the modal */}
        </>
    );
};

export default ChallengecardAddButton;
