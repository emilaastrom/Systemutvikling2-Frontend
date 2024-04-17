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

    return (
        <div onClick={onClose} className="fixed h-screen w-screen inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal content */}
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen sm:w-1/2 h-1/2 overflow-auto">
                <div className="bg-green-200 p-4 rounded-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    {challengeText}
                </div>
                <div className="flex flex-wrap justify-center">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="flex-none p-4">
                            <ChallengecardModalButton 
                                text="test"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengecardModal;
